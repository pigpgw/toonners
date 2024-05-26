package com.example.toonners.exception.chatRoom;

import com.example.toonners.exception.errorCode.ErrorCode;

public class ChatRoomAlreadyExistException extends RuntimeException {
    public ChatRoomAlreadyExistException() {
        super(ErrorCode.CHATROOM_ALREADY_EXIST.getDescription());
    }

}
