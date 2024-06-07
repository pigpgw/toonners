package com.example.toonners.domain.chat.controller;

import com.example.toonners.common.ApiResponse;
import com.example.toonners.domain.chat.dto.request.CreateChatRequest;
import com.example.toonners.domain.chat.dto.response.ChatInfoResponse;
import com.example.toonners.domain.chat.service.ChatService;
import com.example.toonners.domain.chatRoom.dto.response.ChatRoomInfoResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/chat/create")
    public ApiResponse<ChatInfoResponse> createChat(
            @RequestHeader("Authorization") String token,
            @RequestBody CreateChatRequest request
    ) {
        return ApiResponse.createSuccessWithMessage(
                chatService.createChat(token, request), "챗 보내기 성공");
    }

    @GetMapping("/chat/search/chatroom")
    public ApiResponse<List<ChatInfoResponse>> searchChatByChatRoom(
            @RequestHeader("Authorization") String token,
            @RequestParam(value = "chatroom-id") Long chatRoomId
    ) {
        return ApiResponse.createSuccess(chatService.searchChatByChatRoom(token, chatRoomId));
    }

    @GetMapping("/chatroom/search/participating-in")
    public ApiResponse<List<ChatRoomInfoResponse>> searchChatRoomParticipating(
            @RequestHeader("Authorization") String token
    ) {
        return ApiResponse.createSuccess(chatService.searchChatRoomParticipating(token));
    }
    @GetMapping("/chatroom/search/participating-in/member")
    public ApiResponse<List<ChatRoomInfoResponse>> searchChatRoomParticipatingByMemberId(
            @RequestHeader("Authorization") String token,
            @RequestParam(value = "member-id") Long memberId
    ) {
        return ApiResponse.createSuccess(chatService.searchChatRoomParticipatingByMemberId(token, memberId));
    }
}
