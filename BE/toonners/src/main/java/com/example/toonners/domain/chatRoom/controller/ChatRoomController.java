package com.example.toonners.domain.chatRoom.controller;

import com.example.toonners.common.ApiResponse;
import com.example.toonners.domain.chatRoom.dto.request.CreateChatRoomRequest;
import com.example.toonners.domain.chatRoom.dto.response.ChatRoomInfoResponse;
import com.example.toonners.domain.chatRoom.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/chatroom/search/all")
    public ApiResponse<List<ChatRoomInfoResponse>> searchAllChatRoom(
            @RequestHeader("Authorization") String token
    ) {
        return ApiResponse.createSuccess(chatRoomService.searchAllChatRoom(token));
    }

    @GetMapping("/chatroom/search/updated-day")
    public ApiResponse<List<ChatRoomInfoResponse>> searchUpdatedChatRoom(
            @RequestHeader("Authorization") String token
    ) {
        return ApiResponse.createSuccess(chatRoomService.searchUpdatedChatRoom(token));
    }

    @GetMapping("/chatroom/search/detail/{chatRoomId}")
    public ApiResponse<ChatRoomInfoResponse> searchChatRoomDetail(
            @PathVariable(value = "chatRoomId") Long chatRoomId
    ) {
        return ApiResponse.createSuccess(chatRoomService.searchChatRoomDetail(chatRoomId));
    }

    @GetMapping("/chatroom/check-chatroom/{toonname}")
    public ApiResponse<Boolean> existChatRoom(
            @PathVariable(value = "toonname") String toonName) {
        return ApiResponse.createSuccess(chatRoomService.existChatRoom(toonName));
    }

    @GetMapping("/chatroom/search/chatroom-list")
    public ApiResponse<List<ChatRoomInfoResponse>> searchAllChatRoomByPartOfChatRoomName(
            @RequestParam(value = "part-of-name") String partOfChatRoomName
    ) {
        return ApiResponse.createSuccess(chatRoomService
                .searchAllChatRoomByPartOfChatRoomName(partOfChatRoomName));
    }
    @GetMapping("/chatroom/search/top10")
    public ApiResponse<List<ChatRoomInfoResponse>> searchChatRoomTop10(
            @RequestHeader("Authorization") String token
    ) {
        return ApiResponse.createSuccess(chatRoomService.searchChatRoomTop10(token));
    }

}
