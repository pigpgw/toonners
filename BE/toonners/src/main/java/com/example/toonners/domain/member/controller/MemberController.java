package com.example.toonners.domain.member.controller;

import com.example.toonners.common.ApiResponse;
import com.example.toonners.config.jwt.TokenProvider;
import com.example.toonners.domain.member.dto.request.SignInRequest;
import com.example.toonners.domain.member.dto.request.SignUpRequest;
import com.example.toonners.domain.member.dto.request.UpdateMemberRequest;
import com.example.toonners.domain.member.dto.response.InfoResponse;
import com.example.toonners.domain.member.entity.Member;
import com.example.toonners.domain.member.service.KakaoUserService;
import com.example.toonners.domain.member.service.MemberService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Validated
public class MemberController {

    private final MemberService memberService;
    private final KakaoUserService kakaoUserService;

    private final TokenProvider tokenProvider;

    @PostMapping("/oauth2/callback/kakao")
    public InfoResponse kakaoLogin(@RequestBody String code, HttpServletResponse response)
            throws JsonProcessingException {
        return kakaoUserService.kakaoLogin(code, response);
    }

    @PutMapping("/member/update")
    public ApiResponse<InfoResponse> updateMember(
            @RequestBody UpdateMemberRequest request,
            @RequestHeader("Authorization") String token) {
        InfoResponse result = memberService.updateMember(request, token);
        return ApiResponse.createSuccessWithMessage(result, "정상적으로 수정되었습니다");
    }

    @GetMapping("/member/search/my-info")
    public ApiResponse<InfoResponse> searchMyInfo(
            @RequestHeader("Authorization") String token
    ) {
        InfoResponse response = memberService.searchMyInfo(token);
        return ApiResponse.createSuccess(response);
    }

    @GetMapping("/member/search/member-info")
    public ApiResponse<InfoResponse> searchMemberInfo(
            @RequestParam(value = "member-id") Long memberId
    ) {
        InfoResponse response = memberService.searchMemberInfo(memberId);
        return ApiResponse.createSuccess(response);
    }

    //사용할수 있는 닉네임인지 확인
    @PostMapping("/member/check/nickname")
    public ApiResponse<Boolean> checkNickname(@RequestBody UpdateMemberRequest request) {
        Boolean response = memberService.checkNicknameAvailability(request);
        return ApiResponse.createSuccessWithMessage(response, "사용하실 수 있는 닉네임 입니다");
    }

    // 회원 탈퇴
    @DeleteMapping("/member/delete")
    public ApiResponse<?> delete(@RequestHeader("Authorization") String token) {
        memberService.deleteMember(token);
        return ApiResponse.createMessage("정상적으로 탈퇴되었습니다.");
    }

    // 카카오 로그아웃
    @PostMapping("/logout")
    public ApiResponse<?> kakaoLogout(
            @RequestHeader("Authorization") String token
            , HttpServletRequest request
            , HttpServletResponse response) {
        kakaoUserService.logout(token, request, response);
        return ApiResponse.createMessage("정상적으로 로그아웃 하셨습니다.");
    }

    /**
     * 기능 테스트를 위한 회원가입 및 로그인
     **/
    @PostMapping("/signup")
    public ApiResponse<?> signup(@Valid @RequestBody SignUpRequest request) {
        memberService.signup(request);
        return ApiResponse.createMessage("가입이 완료되었습니다!");
    }

    @PostMapping("/signin")
    public ApiResponse<InfoResponse> login(@Valid @RequestBody SignInRequest request, HttpServletResponse response) {
        Member member = memberService.signin(request);
        String token = tokenProvider.generateToken(member.getEmail());
        response.addHeader("Authorization", "Bearer" + " " + token);
        return ApiResponse.createSuccessWithMessage(InfoResponse.fromEntity(member), "로그인 되셧습니다");
    }

    @PostMapping("/logout/server")
    public ApiResponse<?> logout(
            @RequestHeader("Authorization") String token
            , HttpServletRequest request
            , HttpServletResponse response) {
        memberService.logout(token, request, response);
        return ApiResponse.createMessage("정상적으로 로그아웃 하셨습니다.");
    }
}
