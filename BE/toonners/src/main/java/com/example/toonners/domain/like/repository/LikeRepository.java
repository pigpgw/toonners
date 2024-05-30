package com.example.toonners.domain.like.repository;

import com.example.toonners.domain.feed.entity.Feed;
import com.example.toonners.domain.like.entity.Like;
import com.example.toonners.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

    Optional<Like> findByMemberAndFeed(Member member, Feed feed);
}
