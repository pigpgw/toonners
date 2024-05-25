package com.example.toonners.domain.fire.controller;

import com.example.toonners.common.ApiResponse;
import com.example.toonners.domain.fire.dto.request.CreateFireRequest;
import com.example.toonners.domain.fire.service.FireService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class FireController {

    private final FireService fireService;

    @PostMapping("/fire/on")
    public ApiResponse<String> createFire(
            @RequestHeader("Authorization") String token,
            @RequestBody CreateFireRequest request
            ) {
        String response = fireService.createFire(token, request);
        return ApiResponse.createSuccess(response);
    }
}
