package com.example.toonners.domain.chat.repository;

import com.example.toonners.domain.chat.entity.Chat;
import com.example.toonners.domain.chatRoom.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findAllByChatRoomId(Long chatroomId);
    List<Chat> findTop3ByChatRoomOrderByCreatedAtDesc(ChatRoom chatRoom);
}
