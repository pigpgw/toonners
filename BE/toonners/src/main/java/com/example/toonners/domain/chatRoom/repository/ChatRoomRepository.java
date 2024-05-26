package com.example.toonners.domain.chatRoom.repository;

import com.example.toonners.domain.chatRoom.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    List<ChatRoom> findByUpdatedDaysLike(String day);

    Optional<ChatRoom> findByToonName(String toonName);

    List<ChatRoom> findByToonNameContains(String partOfChatRoomName);

    List<ChatRoom> findTop3ByOrderByFireTotalCountDesc();
}
