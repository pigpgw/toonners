package com.example.toonners.exception.errorCode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    // member error code
    USER_NOT_MATCH("유저가 일치하지 않습니다. 유저정보를 확인해주세요.")
    ;
    private final String description;
}
