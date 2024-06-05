package com.example.toonners.domain.like.controller;

import com.example.toonners.common.ApiResponse;
import com.example.toonners.domain.like.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;

    @PostMapping("/like/feed")
    public ApiResponse<String> OnLikeFeed(
            @RequestHeader("Authorization") String token,
            @RequestParam(value = "feed-id") Long feedId
    ) {
        return ApiResponse.createSuccess(likeService.OnLikeFeed(token, feedId));
    }
}
