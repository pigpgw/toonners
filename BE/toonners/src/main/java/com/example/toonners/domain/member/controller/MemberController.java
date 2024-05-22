package com.example.toonners.domain.member.controller;

import com.example.toonners.config.jwt.TokenProvider;
import com.example.toonners.domain.member.dto.response.InfoResponse;
import com.example.toonners.domain.member.service.KakaoUserService;
import com.example.toonners.domain.member.service.MemberService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Validated
public class MemberController {

    private final MemberService memberService;
    private final TokenProvider tokenProvider;
    private final KakaoUserService kakaoUserService;

    @GetMapping("/oauth2/callback/kakao")
    public InfoResponse kakaoLogin(@RequestParam String code, HttpServletResponse response)
            throws JsonProcessingException {
        System.out.println(code);
        return kakaoUserService.kakaoLogin(code, response);
    }
}
