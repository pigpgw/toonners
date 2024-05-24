package com.example.toonners.domain.chat.service;

import com.example.toonners.config.jwt.TokenProvider;
import com.example.toonners.domain.chat.dto.request.CreateChatRequest;
import com.example.toonners.domain.chat.dto.response.ChatInfoResponse;
import com.example.toonners.domain.chat.entity.Chat;
import com.example.toonners.domain.chat.repository.ChatRepository;
import com.example.toonners.domain.chatRoom.repository.ChatRoomRepository;
import com.example.toonners.domain.member.repository.MemberRepository;
import com.example.toonners.domain.toondata.repository.ToonDataRepository;
import com.example.toonners.exception.member.UserDoesNotExistException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final TokenProvider tokenProvider;
    private final MemberRepository memberRepository;
    private final ToonDataRepository toonDataRepository;

    public ChatInfoResponse createChat(
            String token, CreateChatRequest request
    ) {
        // 맴버 인지 확인
        String emailFromToken = tokenProvider.getEmailFromToken(token);
        if (!memberRepository.existsByEmail(emailFromToken)) {
            throw new UserDoesNotExistException();
        }

        Chat chatMessage = Chat.builder()
                .chatMember(tokenProvider.getMemberFromToken(token))
                .chatRoom(chatRoomRepository.findById(request.getChatRoomId())
                        .orElseThrow(UserDoesNotExistException::new))
                .contexts(request.getContexts())
                .build();
        chatRepository.save(chatMessage);

        return ChatInfoResponse.fromEntity(chatMessage);
    }
}
