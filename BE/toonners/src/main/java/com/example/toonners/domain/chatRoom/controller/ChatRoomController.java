package com.example.toonners.domain.chatRoom.controller;

import com.example.toonners.common.ApiResponse;
import com.example.toonners.domain.chatRoom.dto.request.CreateChatRoomRequest;
import com.example.toonners.domain.chatRoom.dto.response.ChatRoomInfoResponse;
import com.example.toonners.domain.chatRoom.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    @PostMapping("/chatroom/create")
    public ApiResponse<ChatRoomInfoResponse> creatChatRoom(
            @RequestHeader("Authorization") String token,
            @RequestBody CreateChatRoomRequest request
    ) {
        ChatRoomInfoResponse response = chatRoomService.createChatroom(token, request);

        return ApiResponse.createSuccessWithMessage(response, "채팅방 생성 완료");
    }
}
