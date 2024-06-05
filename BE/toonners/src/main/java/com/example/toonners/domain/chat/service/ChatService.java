package com.example.toonners.domain.chat.service;

import com.example.toonners.config.jwt.TokenProvider;
import com.example.toonners.domain.chat.dto.request.CreateChatRequest;
import com.example.toonners.domain.chat.dto.response.ChatInfoResponse;
import com.example.toonners.domain.chat.entity.Chat;
import com.example.toonners.domain.chat.repository.ChatRepository;
import com.example.toonners.domain.chatRoom.dto.response.ChatRoomInfoResponse;
import com.example.toonners.domain.chatRoom.entity.ChatRoom;
import com.example.toonners.domain.chatRoom.repository.ChatRoomRepository;
import com.example.toonners.domain.member.entity.Member;
import com.example.toonners.domain.member.repository.MemberRepository;
import com.example.toonners.exception.member.UserDoesNotExistException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final TokenProvider tokenProvider;
    private final MemberRepository memberRepository;

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

    public List<ChatInfoResponse> searchChatByChatRoom(String token, Long chatRoomId) {
        // 맴버 인지 확인
        String emailFromToken = tokenProvider.getEmailFromToken(token);
        if (!memberRepository.existsByEmail(emailFromToken)) {
            throw new UserDoesNotExistException();
        }

        List<Chat> chatList = chatRepository.findAllByChatRoomId(chatRoomId);
        return chatList.stream().map(ChatInfoResponse::fromEntity).toList();
    }

    public List<ChatRoomInfoResponse> searchChatRoomParticipating(String token) {
        // 맴버 정보 조회
        Member member = tokenProvider.getMemberFromToken(token);
        // 내가 쓴 채팅 조회 후 채팅방 객체 가져오고 중복 제거 위해 set 으로
        Set<ChatRoom> chatRoomSet = chatRepository.findByChatMember(member)
                .stream().map(Chat::getChatRoom).collect(Collectors.toSet());
        return chatRoomSet.stream().map(ChatRoomInfoResponse::fromEntity).toList();
    }
}
