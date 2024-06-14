package com.example.toonners.domain.member.service;

import com.example.toonners.config.constant.Role;
import com.example.toonners.config.jwt.TokenProvider;
import com.example.toonners.domain.member.dto.request.SignUpRequest;
import com.example.toonners.domain.member.dto.response.InfoResponse;
import com.example.toonners.domain.member.entity.Member;
import com.example.toonners.domain.member.repository.MemberRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class KakaoUserService {

    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String redirectUri;
    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String clientId;

    public InfoResponse kakaoLogin(String code, HttpServletResponse response) throws JsonProcessingException {
        // 1. "인가 코드"로 "액세스 토큰" 요청
        String accessToken = getAccessToken(code);

        // 2. 토큰으로 카카오 API 호출
        SignUpRequest kakaoUserInfoDto = getKakaoUserInfo(accessToken);

        // 3. 카카오ID로 회원가입 처리
        Member kakaoUser = signupKakaoUser(kakaoUserInfoDto);

        // 4. 강제 로그인 처리
        Authentication authentication = forceLoginKakaoUser(kakaoUser);

        // 5. response Header에 JWT 토큰 추가
        kakaoUsersAuthorizationInput(authentication, response);
        return InfoResponse.fromEntity(kakaoUser);
    }

    private SignUpRequest getKakaoUserInfo(String accessToken) throws JsonProcessingException {
        log.info("access token:" + accessToken);
        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoUserInfoRequest = new HttpEntity<>(headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoUserInfoRequest,
                String.class
        );

        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        String id = String.valueOf(jsonNode.get("id"));
        String nickname = jsonNode.get("properties")
                .get("nickname").asText();
        SignUpRequest member = SignUpRequest.builder()
                .email(id)
                .nickname(nickname)
                .build();
        return member;

    }

    private Member signupKakaoUser(SignUpRequest kakaoUserInfo) {
        // DB 에 중복된 Kakao Id 가 있는지 확인
        String sId = kakaoUserInfo.getEmail();
        String email = sId + "@tooners.com";
        Member user = memberRepository.findByEmail(email)
                .orElse(null);

        //비밀번호 랜덤 생성
        String password = UUID.randomUUID().toString();
        String encodedPassword = passwordEncoder.encode(password);

        if (user == null) {
            // 회원가입
            String nickName = kakaoUserInfo.getNickname();

            SignUpRequest socialUser = SignUpRequest.builder()
                    .email(email)
                    .nickname(nickName)
                    .password(encodedPassword)
                    .oauthType("kakao")
                    .build();
            user = memberRepository.save(setAccount(socialUser));

            return user;

        }
        return user;
    }

    private Member setAccount(SignUpRequest request) {
        return Member.builder()
                .email(request.getEmail())
                .oauthType(request.getOauthType())
                .role(Role.MEMBER)
                .password(request.getPassword())
                .build();
    }

    private String getAccessToken(String code) throws JsonProcessingException {
        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP Body 생성
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", this.clientId);
        body.add("redirect_uri", this.redirectUri);
        body.add("code", code);

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
                new HttpEntity<>(body, headers);
        RestTemplate rt = new RestTemplate();
        rt.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        // HTTP 응답 (JSON) -> 액세스 토큰 파싱
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        return jsonNode.get("access_token").asText();
    }

    private Authentication forceLoginKakaoUser(Member kakaoUser) {
        log.info("userinfo" + kakaoUser);
        Authentication authentication = new UsernamePasswordAuthenticationToken(kakaoUser, null, kakaoUser.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return authentication;
    }

    private void kakaoUsersAuthorizationInput(Authentication authentication, HttpServletResponse response) {
        // response header에 token 추가
        Member userDetailsImpl = ((Member) authentication.getPrincipal());
        String token = tokenProvider.generateToken(userDetailsImpl.getEmail());
        response.addHeader("Authorization", "BEARER" + " " + token);
    }
    // 카카오 로그아웃
    @Transactional
    public void logout(String token, HttpServletRequest request, HttpServletResponse response) {
        // 1. 카카오 로그아웃 호출
        String accessToken = tokenProvider.getAccessTokenFromToken(token);
        try {
            kakaoLogout(accessToken);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("카카오 로그아웃 중 오류 발생", e);
        }
        // 2. 서버 로그아웃 처리
        SecurityContextHolder.clearContext(); // Spring Security 컨텍스트 정리
        HttpSession session = request.getSession(false); // 현재 세션 가져오기
        if (session != null) {
            session.invalidate(); // 세션 무효화
        }
        // 클라이언트 측 쿠키 삭제
        response.addHeader("Set-Cookie", "JSESSIONID=; Path=/; HttpOnly; Max-Age=0;");
    }

    public void kakaoLogout(String accessToken) throws JsonProcessingException {
        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoLogoutRequest = new HttpEntity<>(headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
                "https://kapi.kakao.com/v1/user/logout",
                HttpMethod.POST,
                kakaoLogoutRequest,
                String.class
        );

        // 응답 처리
        if (response.getStatusCode() != HttpStatus.OK) {
            throw new RuntimeException("카카오 로그아웃 실패");
        }
    }

    /**
     * 카카오 로그아웃
     *
     * @return
     */
    public String kakaoLogout(String token, HttpServletRequest request, HttpServletResponse response) {
        String accessToken = tokenProvider.getAccessTokenFromToken(token);
        HttpSession session = request.getSession(false); // 현재 세션 가져오기
        if (accessToken != null && !"".equals(accessToken)) {
            try {
                kakaoDisconnect(accessToken);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
            session.removeAttribute("kakaoToken");
            session.removeAttribute("loginMember");
        } else {
            System.out.println("accessToken is null");
        }

        return "redirect:/";
    }

    public void kakaoDisconnect(String accessToken) throws JsonProcessingException {
        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded");

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoLogoutRequest = new HttpEntity<>(headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
                "https://kapi.kakao.com/v1/user/logout",
                HttpMethod.POST,
                kakaoLogoutRequest,
                String.class
        );

        // responseBody에 있는 정보를 꺼냄
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);

        Long id = jsonNode.get("id").asLong();
        System.out.println("반환된 id: " + id);
    }
}

