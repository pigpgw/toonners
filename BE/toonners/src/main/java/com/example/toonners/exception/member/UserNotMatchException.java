package com.example.toonners.exception.member;

import static com.example.toonners.exception.errorCode.ErrorCode.USER_NOT_MATCH;

public class UserNotMatchException extends RuntimeException {
    public UserNotMatchException() {
        super(USER_NOT_MATCH.getDescription());
    }
}
