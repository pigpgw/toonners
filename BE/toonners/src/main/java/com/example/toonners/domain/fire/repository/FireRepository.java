package com.example.toonners.domain.fire.repository;

import com.example.toonners.domain.fire.entity.Fire;
import com.example.toonners.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FireRepository extends JpaRepository<Fire, Long> {
    Optional<Fire> findByMemberAndChatRoomId(Member member, Long chatRoomId);
}
