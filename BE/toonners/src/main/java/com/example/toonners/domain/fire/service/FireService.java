package com.example.toonners.domain.fire.service;

import com.example.toonners.config.jwt.TokenProvider;
import com.example.toonners.domain.chatRoom.entity.ChatRoom;
import com.example.toonners.domain.chatRoom.repository.ChatRoomRepository;
import com.example.toonners.domain.fire.dto.request.CreateFireRequest;
import com.example.toonners.domain.fire.entity.Fire;
import com.example.toonners.domain.fire.repository.FireRepository;
import com.example.toonners.domain.member.entity.Member;
import com.example.toonners.exception.chatRoom.ChatRoomDoseNotExist;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class FireService {

    private final FireRepository fireRepository;
    private final TokenProvider tokenProvider;
    private final ChatRoomRepository chatRoomRepository;

    public String createFire(String token, CreateFireRequest request) {
        Member member = tokenProvider.getMemberFromToken(token);
        //
        if (fireRepository.findByMemberAndChatRoomId(member, request.getChatRoomId()).isPresent()) {
            return "이미 누르셨습니다.";
        }
        //
        fireRepository.save(Fire.builder().member(member).chatRoomId(request.getChatRoomId()).build());

        ChatRoom chatRoom = chatRoomRepository.findById(request.getChatRoomId()).orElseThrow(ChatRoomDoseNotExist::new);
        chatRoom.setFireTotalCount(chatRoom.getFireTotalCount() != null ? chatRoom.getFireTotalCount() + 1 : 1);
        chatRoom.setFireTodayCount(chatRoom.getFireTodayCount() != null ? chatRoom.getFireTodayCount() + 1 : 1);
        chatRoomRepository.save(chatRoom);

        return "불 이모지 눌렀습니다.";
    }
}
