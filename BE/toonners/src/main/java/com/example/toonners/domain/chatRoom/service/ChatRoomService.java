package com.example.toonners.domain.chatRoom.service;

import com.example.toonners.config.jwt.TokenProvider;
import com.example.toonners.domain.chatRoom.dto.request.CreateChatRoomRequest;
import com.example.toonners.domain.chatRoom.dto.response.ChatRoomInfoResponse;
import com.example.toonners.domain.chatRoom.entity.ChatRoom;
import com.example.toonners.domain.chatRoom.repository.ChatRoomReposititory;
import com.example.toonners.domain.member.repository.MemberRepository;
import com.example.toonners.domain.toondata.entity.ToonData;
import com.example.toonners.domain.toondata.repository.ToonDataRepository;
import com.example.toonners.exception.chatRoom.ChatRoomAlreadyExistException;
import com.example.toonners.exception.member.UserDoesNotExistException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class ChatRoomService {

    private final ChatRoomReposititory chatRoomReposititory;
    private final TokenProvider tokenProvider;
    private final MemberRepository memberRepository;
    private final ToonDataRepository toonDataRepository;

    @Transactional
    public ChatRoomInfoResponse createChatroom(
            String token, CreateChatRoomRequest request) {

        // 맴버 인지 확인
        String emailFromToken = tokenProvider.getEmailFromToken(token);
        if (!memberRepository.existsByEmail(emailFromToken)) {
            throw new UserDoesNotExistException();
        }

        // 웹툰 데이터 db에 없으면 db 업데이트
        if (toonDataRepository.findByTitle(request.getToonName()).isEmpty()) {
            toonDataRepository.save(ToonData.builder()
                    .title(request.getToonName())
                    .imageUrl(request.getToonImage())
                    .siteUrl(request.getToonUrl())
                    .rating(request.getFanCounts())
                    .days(request.getUpdateDay())
                    .build());
        } else {
            throw new ChatRoomAlreadyExistException();
        }

        ChatRoom chatRoom = chatRoomReposititory.save(ChatRoom.builder()
                .toonName(request.getToonName())
                .toonImageUrl(request.getToonImage())
                .toonSiteUrl(request.getToonUrl())
                .contexts(request.getContexts())
                .build());

        return ChatRoomInfoResponse.fromEntity(chatRoom);

    }

    @Transactional
    public List<ChatRoomInfoResponse> searchAllChatRoom(String token) {

        // 북마크 등 개인 상호 작용 결과 삽입을 위한 맴버 정보
        Long memberId = tokenProvider.getMemberFromToken(token).getId();

        // 인기 순으로 전체 조회
        List<ChatRoom> chatRoomList = chatRoomReposititory.findAll(
                Sort.by(Sort.Direction.DESC, "fireTotalCount"));

        List<ChatRoomInfoResponse> responseList = chatRoomList.stream()
                .map(ChatRoomInfoResponse::fromEntity).toList();

        return responseList;
    }
}
