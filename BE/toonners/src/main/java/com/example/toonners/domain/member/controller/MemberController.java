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

    @GetMapping("/oauth2/callback/kakao")
    public InfoResponse kakaoLogin(@RequestParam String code, HttpServletResponse response)
            throws JsonProcessingException {
        return kakaoUserService.kakaoLogin(code, response);
    }

    @PutMapping("/member/update/{member_id}")
    public ApiResponse<InfoResponse> updateMember(@PathVariable(value = "member_id") Long id,
                                                  @RequestBody UpdateMemberRequest request,
                                                  @RequestHeader("Authorization") String token) {
        InfoResponse result = memberService.updateMember(id, request, token);
        return ApiResponse.createSuccessWithMessage(result, "정상적으로 수정되었습니다");
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

}
