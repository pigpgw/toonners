package com.example.toonners.exception.handler;

import com.example.toonners.common.ApiResponse;
import com.example.toonners.exception.feed.FeedDoseNotExistException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class FeedExceptionHandler {
    //피드 조회시 없는 피드일 때
    @ExceptionHandler(FeedDoseNotExistException.class)
    public ResponseEntity<ApiResponse<?>> handleFeedDoseNotExistException(RuntimeException exception) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ApiResponse.createError(exception.getMessage()));
    }
}
