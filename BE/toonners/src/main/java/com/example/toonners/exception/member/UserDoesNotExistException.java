package com.example.toonners.exception.member;

public class UserDoesNotExistException extends RuntimeException {
    public UserDoesNotExistException() {
        super("존재하지 않는 유저입니다");
    }
}
