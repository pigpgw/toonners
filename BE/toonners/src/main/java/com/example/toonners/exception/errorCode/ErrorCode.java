package com.example.toonners.exception.errorCode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    // member error code
    USER_NOT_MATCH("유저가 일치하지 않습니다. 유저정보를 확인해주세요."),

    // chatRoom error code
    CHATROOM_ALREADY_EXIST("이미 채팅방이 존재합니다.")

    ;
    private final String description;
}
