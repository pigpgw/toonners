package com.example.toonners.domain.member.controller;

import com.example.toonners.common.ApiResponse;
import com.example.toonners.domain.member.dto.request.UpdateMemberRequest;
import com.example.toonners.domain.member.dto.response.InfoResponse;
import com.example.toonners.domain.member.service.KakaoUserService;
import com.example.toonners.domain.member.service.MemberService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Validated
public class MemberController {

    private final MemberService memberService;
    private final KakaoUserService kakaoUserService;

    @GetMapping("/oauth2/callback/kakao")
    public InfoResponse kakaoLogin(@RequestParam String code, HttpServletResponse response)
            throws JsonProcessingException {
        System.out.println(code);
        return kakaoUserService.kakaoLogin(code, response);
    }

    @PostMapping("/member/update/{member_id}")
    public ApiResponse<InfoResponse> updateMember(@PathVariable(value = "member_id") Long id,
                                                  @RequestBody UpdateMemberRequest request,
                                                  @RequestHeader("Authorization") String token) {
        InfoResponse result = memberService.updateMember(id, request, token);
        return ApiResponse.createSuccessWithMessage(result, "정상적으로 수정되었습니다");
    }
}
