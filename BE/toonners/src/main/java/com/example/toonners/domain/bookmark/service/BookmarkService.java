package com.example.toonners.domain.bookmark.service;

import com.example.toonners.config.jwt.TokenProvider;
import com.example.toonners.domain.bookmark.entity.Bookmark;
import com.example.toonners.domain.bookmark.repository.BookmarkRepository;
import com.example.toonners.domain.feed.entity.Feed;
import com.example.toonners.domain.feed.repository.FeedRepository;
import com.example.toonners.domain.member.entity.Member;
import com.example.toonners.exception.feed.FeedDoseNotExistException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final TokenProvider tokenProvider;
    private final FeedRepository feedRepository;

    public String saveBookmarkFeed(String token, Long parentFeedId) {
        //
        Member member = tokenProvider.getMemberFromToken(token);
        //
        Feed feed = feedRepository.findById(parentFeedId).orElseThrow(FeedDoseNotExistException::new);

        Optional<Bookmark> existingMark = bookmarkRepository
                .findByMemberIdAndFeedIdAndBookmarkType(
                        member.getId(), parentFeedId, "feed");

        if (existingMark.isPresent()) {
            bookmarkRepository.delete(existingMark.orElse(null));
            return "북마크 삭제";
        }

        bookmarkRepository.save(Bookmark.builder()
                .member(member)
                .bookmarkType("feed")
                .feed(feed)
                .build());
        return "북마크 완료";
    }
}
