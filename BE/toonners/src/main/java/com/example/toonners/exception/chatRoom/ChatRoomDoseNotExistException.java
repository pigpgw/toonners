package com.example.toonners.exception.chatRoom;

import com.example.toonners.exception.errorCode.ErrorCode;

public class ChatRoomDoseNotExistException extends RuntimeException{
    public ChatRoomDoseNotExistException(){
        super(ErrorCode.CHATROOM_DOSE_NOT_EXIST.getDescription());
    }
}
