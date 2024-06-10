package com.example.toonners.domain.chatRoom;

import com.example.toonners.domain.chatRoom.entity.ChatRoom;
import com.example.toonners.domain.chatRoom.repository.ChatRoomRepository;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@EnableScheduling
public class ChatRoomScheduler {

    private final ChatRoomRepository ChatRoomRepository;

    public ChatRoomScheduler(ChatRoomRepository ChatRoomRepository) {
        this.ChatRoomRepository = ChatRoomRepository;
    }

    // 매일 오후 11시에 실행
    @Transactional
    @Scheduled(cron = "0 0 23 * * *")
    public void resetChatCount() {
        List<ChatRoom> chatRoomList = ChatRoomRepository.findByTodayChatCountIsNotNull();
        for (ChatRoom chatRoom : chatRoomList) {
            chatRoom.setTodayChatCount(null);
        }
    }
}
