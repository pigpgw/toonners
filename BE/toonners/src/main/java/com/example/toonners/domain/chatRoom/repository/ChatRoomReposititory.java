package com.example.toonners.domain.chatRoom.repository;

import com.example.toonners.domain.chatRoom.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomReposititory extends JpaRepository<ChatRoom, Long> {
}
