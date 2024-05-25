package com.example.toonners.exception.chatRoom;

import com.example.toonners.exception.errorCode.ErrorCode;

public class ChatRoomDoseNotExist extends RuntimeException{
    public ChatRoomDoseNotExist(){
        super(ErrorCode.CHATROOM_DOSE_NOT_EXIST.getDescription());
    }
}
