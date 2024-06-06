package com.example.toonners.domain.feed.controller;

import com.example.toonners.common.ApiResponse;
import com.example.toonners.domain.feed.dto.request.CreateFeedRequest;
import com.example.toonners.domain.feed.dto.request.UpdateFeedRequest;
import com.example.toonners.domain.feed.dto.response.FeedInfoResponse;
import com.example.toonners.domain.feed.service.FeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PutMapping("/feed/update/{feedId}")
    public ApiResponse<FeedInfoResponse> updateFeed(
            @RequestHeader("Authorization") String token,
            @PathVariable Long feedId,
            @RequestBody UpdateFeedRequest request
    ) {
        return ApiResponse.createSuccessWithMessage(
                feedService.updateFeed(token, feedId, request), "피드 수정 성공");
    }

    @GetMapping("/feed/search/all/parent-feed")
    public ApiResponse<List<FeedInfoResponse>> searchAllParentFeed(
            @RequestHeader("Authorization") String token
    ) {
        List<FeedInfoResponse> reponseList = feedService.searchAllParentFeed(token);
        return ApiResponse.createSuccess(reponseList);
    }

    @GetMapping("/feed/search/my-parent-feed")
    public ApiResponse<List<FeedInfoResponse>> searchAllMyParentFeed(
            @RequestHeader("Authorization") String token
    ) {
        List<FeedInfoResponse> reponseList = feedService.searchAllMyParentFeed(token);
        return ApiResponse.createSuccess(reponseList);
    }

    @GetMapping("/feed/search/parent-feed/member")
    public ApiResponse<List<FeedInfoResponse>> searchAllMyParentFeed(
            @RequestHeader("Authorization") String token,
            @RequestParam(value = "member-id") Long memberId
    ) {
        List<FeedInfoResponse> reponseList = feedService.searchAllParentFeedByMember(token, memberId);
        return ApiResponse.createSuccess(reponseList);
    }

    @GetMapping("/feed/search/detail/parent-feed")
    public ApiResponse<FeedInfoResponse> searchDetailParentFeed(
            @RequestHeader("Authorization") String token,
            @RequestParam(value = "parent-feed-id") Long parentFeedId
    ) {
        FeedInfoResponse response = feedService.searchDetailFeed(token, parentFeedId);
        return ApiResponse.createSuccess(response);
    }

    @GetMapping("/feed/search/bookmarked")
    public ApiResponse<List<FeedInfoResponse>> searchBookmarkedFeeds(
            @RequestHeader("Authorization") String token
    ) {
        List<FeedInfoResponse> responseList = feedService.searchBookmarkedFeeds(token);
        return ApiResponse.createSuccess(responseList);
    }

    @GetMapping("/feed/search/feed-list")
    public ApiResponse<List<FeedInfoResponse>> searchAllParentFeedByPartOfTitle(
            @RequestHeader("Authorization") String token,
            @RequestParam(value = "part-of-title") String partOfTitle
    ) {
        List<FeedInfoResponse> responseList = feedService.searchAllParentFeedByPartOfTitle(token, partOfTitle);
        return ApiResponse.createSuccess(responseList);
    }

    @DeleteMapping("/feed/delete/{feedId}")
    public ApiResponse<?> deleteFeed(
            @RequestHeader("Authorization") String token,
            @PathVariable Long feedId
    ) {
        feedService.deleteFeed(token, feedId);
        return ApiResponse.createMessage("피드 삭제 성공");
    }
}
