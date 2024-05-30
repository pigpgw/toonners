package com.example.toonners.domain.like.service;

import com.example.toonners.config.jwt.TokenProvider;
import com.example.toonners.domain.feed.entity.Feed;
import com.example.toonners.domain.feed.repository.FeedRepository;
import com.example.toonners.domain.like.entity.Like;
import com.example.toonners.domain.like.repository.LikeRepository;
import com.example.toonners.domain.member.entity.Member;
import com.example.toonners.exception.feed.FeedDoseNotExistException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final TokenProvider tokenProvider;
    private final FeedRepository feedRepository;

    @Transactional
    public String OnLikeFeed(String token, Long feedId) {
        // 토큰으로부터 유저 찾아오기
        Member member = tokenProvider.getMemberFromToken(token);
        // Feed Id로 feed 찾아오기
        Feed feed = feedRepository.findById(feedId)
                .orElseThrow(FeedDoseNotExistException::new);
        // 현재 좋아하고 있는지 검사
        Optional<Like> isLikeOn = likeRepository.findByMemberAndFeed(member, feed);
        // 현재 좋아하면 삭제
        if (isLikeOn.isPresent()) {
            likeRepository.delete(isLikeOn.orElse(null));
            feed.setLikeCounts(feed.getLikeCounts() - 1);
            feedRepository.save(feed);
            return "하트 삭제 완료";
        }
        // 현재 안 좋아하면 좋아요
        Like onLike = Like.builder()
                .member(member)
                .feed(feed)
                .build();
        likeRepository.save(onLike);
        feed.setLikeCounts((feed.getLikeCounts() != null) ? feed.getLikeCounts() + 1 : 1);
        feedRepository.save(feed);
        return "하트 생성 완료";
    }
}
