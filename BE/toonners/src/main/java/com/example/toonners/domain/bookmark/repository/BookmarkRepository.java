package com.example.toonners.domain.bookmark.repository;

import com.example.toonners.domain.bookmark.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    Optional<Bookmark> findByMemberIdAndFeedIdAndBookmarkType(Long member_id, Long bookmarkTypeId, String bookmarkType);

    List<Bookmark> findByMemberIdAndBookmarkType(Long member_id, String bookmarkType);
}
