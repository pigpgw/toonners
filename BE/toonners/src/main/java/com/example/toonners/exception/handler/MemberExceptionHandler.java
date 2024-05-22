package com.example.toonners.exception.handler;

import com.example.toonners.common.ApiResponse;
import com.example.toonners.exception.member.DuplicatedUserException;
import com.example.toonners.exception.member.UserDoesNotExistException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class MemberExceptionHandler {

    //회원가입시 중복 체크
    @ExceptionHandler(DuplicatedUserException.class)
    public ResponseEntity<ApiResponse<?>> handleDuplicatedUserException(RuntimeException exception) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ApiResponse.createError(exception.getMessage()));
    }

    //유저 조회시 없는 유저일때
    @ExceptionHandler(UserDoesNotExistException.class)
    public ResponseEntity<ApiResponse<?>> handleUserDoesNotExistException(RuntimeException exception) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ApiResponse.createError(exception.getMessage()));
    }

}

