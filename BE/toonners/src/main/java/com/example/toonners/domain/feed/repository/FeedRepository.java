package com.example.toonners.domain.feed.repository;

import com.example.toonners.domain.feed.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Long> {
    List<Feed> findAllByParentFlag(Boolean flag);
    List<Feed> findAllByParentFlagAndWriterId(Boolean flag, Long memberId);
    List<Feed> findAllByTitleContains(String partOfTitle);
}
