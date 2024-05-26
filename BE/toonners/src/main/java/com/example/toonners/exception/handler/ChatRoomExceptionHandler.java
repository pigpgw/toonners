package com.example.toonners.exception.handler;

import com.example.toonners.common.ApiResponse;
import com.example.toonners.exception.chatRoom.ChatRoomAlreadyExistException;
import com.example.toonners.exception.chatRoom.ChatRoomDoseNotExist;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ChatRoomExceptionHandler {
    @ExceptionHandler(ChatRoomAlreadyExistException.class)
    public ResponseEntity<ApiResponse<?>> handleChatRoomAlreadyExistException(RuntimeException exception) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ApiResponse.createError(exception.getMessage()));
    }
    @ExceptionHandler(ChatRoomDoseNotExist.class)
    public ResponseEntity<ApiResponse<?>> handleChatRoomDoseNotExist(RuntimeException exception) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ApiResponse.createError(exception.getMessage()));
    }
}
