package com.example.toonners.domain.chatRoom.service;

import com.example.toonners.config.jwt.TokenProvider;
import com.example.toonners.domain.chat.dto.response.ChatInfoResponse;
import com.example.toonners.domain.chat.entity.Chat;
import com.example.toonners.domain.chat.repository.ChatRepository;
import com.example.toonners.domain.chatRoom.dto.request.CreateChatRoomRequest;
import com.example.toonners.domain.chatRoom.dto.response.ChatRoomInfoResponse;
import com.example.toonners.domain.chatRoom.entity.ChatRoom;
import com.example.toonners.domain.chatRoom.repository.ChatRoomRepository;
import com.example.toonners.domain.member.repository.MemberRepository;
import com.example.toonners.domain.toondata.entity.ToonData;
import com.example.toonners.domain.toondata.repository.ToonDataRepository;
import com.example.toonners.exception.chatRoom.ChatRoomAlreadyExistException;
import com.example.toonners.exception.chatRoom.ChatRoomDoseNotExistException;
import com.example.toonners.exception.member.UserDoesNotExistException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final TokenProvider tokenProvider;
    private final MemberRepository memberRepository;
    private final ToonDataRepository toonDataRepository;
    private final ChatRepository chatRepository;

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
        } else if (chatRoomRepository.findByToonName(request.getToonName()).isPresent()) {
            throw new ChatRoomAlreadyExistException();
        }

        StringBuilder updatedDays = new StringBuilder();
        for (int i = 0; i < request.getUpdateDay().size(); i++) {
            updatedDays.append(request.getUpdateDay().get(i));
        }

        ChatRoom chatRoom = chatRoomRepository.save(ChatRoom.builder()
                .toonName(request.getToonName())
                .toonImageUrl(request.getToonImage())
                .toonSiteUrl(request.getToonUrl())
                .updatedDays(updatedDays.toString())
                .contexts(request.getContexts())
                .build());

        return ChatRoomInfoResponse.fromEntity(chatRoom);

    }

    @Transactional
    public List<ChatRoomInfoResponse> searchAllChatRoom(String token) {

        // 북마크 등 개인 상호 작용 결과 삽입을 위한 맴버 정보
        Long memberId = tokenProvider.getMemberFromToken(token).getId();

        // 인기 순으로 전체 조회
        List<ChatRoom> chatRoomList = chatRoomRepository.findAll(
                Sort.by(Sort.Direction.DESC, "fireTotalCount"));

        return chatRoomList.stream()
                .map(ChatRoomInfoResponse::fromEntity).toList();
    }

    @Transactional
    public List<ChatRoomInfoResponse> searchAllChatRoomByPartOfChatRoomName(
            String partOfChatRoomName) {
        List<ChatRoom> chatRoomList = chatRoomRepository.findByToonNameContains(partOfChatRoomName);
        return chatRoomList.stream().map(ChatRoomInfoResponse::fromEntity).toList();
    }

    @Transactional
    public List<ChatRoomInfoResponse> searchChatRoomTop3(String token) {
        List<ChatRoom> chatRoomList = chatRoomRepository.findTop3ByOrderByFireTotalCountDesc();
        List<ChatRoomInfoResponse> responseList = chatRoomList.stream()
                .map(ChatRoomInfoResponse::fromEntity).toList();
        for (int i = 0; i < responseList.size(); i++) {
            List<Chat> chatList = chatRepository.findTop3ByChatRoomOrderByCreatedAtDesc(chatRoomList.get(i));
            responseList.get(i).setChatList(chatList.stream().map(ChatInfoResponse::fromEntity).toList());
        }
        return responseList;
    }

    @Transactional
    public List<ChatRoomInfoResponse> searchChatRoomTop5(String token) {
        List<ChatRoom> chatRoomList = chatRoomRepository.findTop5ByOrderByTodayChatCountDescFireTotalCountDesc();
        List<ChatRoomInfoResponse> responseList = chatRoomList.stream()
                .map(ChatRoomInfoResponse::fromEntity).toList();
        for (int i = 0; i < responseList.size(); i++) {
            List<Chat> chatList = chatRepository.findTop3ByChatRoomOrderByCreatedAtDesc(chatRoomList.get(i));
            responseList.get(i).setChatList(chatList.stream().map(ChatInfoResponse::fromEntity).toList());
        }
        return responseList;
    }

    @Transactional
    public List<ChatRoomInfoResponse> searchUpdatedChatRoom(String token) {

        // 북마크 등 개인 상호 작용 결과 삽입을 위한 맴버 정보
        Long memberId = tokenProvider.getMemberFromToken(token).getId();

        String day = whichDay();
        System.out.println(day);
        List<ChatRoom> chatRoomList = chatRoomRepository.findByUpdatedDaysContaining(day);

        return chatRoomList.stream()
                .map(ChatRoomInfoResponse::fromEntity).toList();
    }

    @Transactional
    public List<ChatRoomInfoResponse> searchChatRoomByDay(String token, String day) {

        // 북마크 등 개인 상호 작용 결과 삽입을 위한 맴버 정보
        Long memberId = tokenProvider.getMemberFromToken(token).getId();

        List<ChatRoom> chatRoomList = chatRoomRepository.findByUpdatedDaysContaining(day);

        return chatRoomList.stream()
                .map(ChatRoomInfoResponse::fromEntity).toList();
    }

    @Transactional
    public ChatRoomInfoResponse searchChatRoomDetail(Long chatroomId) {
        return ChatRoomInfoResponse.fromEntity(chatRoomRepository
                .findById(chatroomId).orElseThrow(ChatRoomDoseNotExistException::new));
    }

    @Transactional
    public Long existChatRoom(String toonName) {
        if (chatRoomRepository.findByToonName(toonName).isPresent()) {
            return chatRoomRepository.findByToonName(toonName).orElseThrow().getId();
        }
        return -1L;
    }

    //내부 메서드
    public static String whichDay() {
        LocalDate date = LocalDate.now();
        int day = date.getDayOfWeek().getValue();
        if (day == 1) {
            return "mon";
        } else if (day == 2) {
            return "tue";
        } else if (day == 3) {
            return "wed";
        } else if (day == 4) {
            return "thu";
        } else if (day == 5) {
            return "fri";
        } else if (day == 6) {
            return "sat";
        } else if (day == 7) {
            return "sun";
        }
        return null;
    }
}
