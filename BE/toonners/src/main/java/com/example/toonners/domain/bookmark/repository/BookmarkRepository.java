package com.example.toonners.domain.bookmark.repository;

import com.example.toonners.domain.bookmark.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    Optional<Bookmark> findByMemberIdAndBookmarkTypeIdAndBookmarkType(Long member_id, Long bookmarkTypeId, String bookmarkType);

}
