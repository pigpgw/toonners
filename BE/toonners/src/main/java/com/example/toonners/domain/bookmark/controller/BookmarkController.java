package com.example.toonners.domain.bookmark.controller;

import com.example.toonners.common.ApiResponse;
import com.example.toonners.domain.bookmark.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @PostMapping("/bookmark/feed")
    public ApiResponse<?> saveBookmarkFeed(
            @RequestHeader("Authorization") String token,
            @RequestParam(value = "feed-id") Long feedId
    ) {
        return ApiResponse.createMessage(bookmarkService.saveBookmarkFeed(token, feedId));
    }

}
