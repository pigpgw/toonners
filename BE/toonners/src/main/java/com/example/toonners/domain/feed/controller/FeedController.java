package com.example.toonners.domain.feed.controller;

import com.example.toonners.common.ApiResponse;
import com.example.toonners.domain.feed.dto.request.CreateFeedRequest;
import com.example.toonners.domain.feed.dto.response.FeedInfoResponse;
import com.example.toonners.domain.feed.service.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class FeedController {

    private final FeedService feedService;

    @PostMapping("/feed/create")
    public ApiResponse<FeedInfoResponse> createFeed(
            @RequestHeader("Authorization") String token,
            @RequestBody CreateFeedRequest request
    ) {
        FeedInfoResponse response = feedService.createFeed(token, request);
        return ApiResponse.createSuccessWithMessage(response, "피드 생성 성공");
    }
}
