package com.example.toonners.domain.feed.service;

import com.example.toonners.config.jwt.TokenProvider;
import com.example.toonners.domain.feed.dto.request.ChildFeedRequest;
import com.example.toonners.domain.feed.dto.request.CreateFeedRequest;
import com.example.toonners.domain.feed.dto.response.FeedInfoResponse;
import com.example.toonners.domain.feed.entity.Feed;
import com.example.toonners.domain.feed.repository.FeedRepository;
import com.example.toonners.domain.member.entity.Member;
import com.example.toonners.domain.toondata.entity.ToonData;
import com.example.toonners.domain.toondata.repository.ToonDataRepository;
import com.example.toonners.exception.feed.FeedDoseNotExistException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;

@Service
@AllArgsConstructor
public class FeedService {

    private final FeedRepository feedRepository;
    private final TokenProvider tokenProvider;
    private final ToonDataRepository toonDataRepository;

    @Transactional
    public FeedInfoResponse createFeed(String token, CreateFeedRequest request) {

        // 토큰으로 맴버 정보 찾기
        Member member = tokenProvider.getMemberFromToken(token);
        // 부모 피드 먼저 생성.
        Feed parentFeed = Feed.builder()
                .writer(member)
                .title(request.getTitle())
                .contexts(request.getContext())
                .childFeed(new LinkedList<>())
                .parentFlag(true)
                .build();
        feedRepository.save(parentFeed);
        //부모 피드 해시태그에 string으로 넘겨주기 위한 스트링빌더 생성
        //검색 용이하게 string으로 저장
        StringBuilder hashtagsGenre = new StringBuilder();
        StringBuilder hashtagsVibe = new StringBuilder();
        //자식 피드 생성.
        List<ChildFeedRequest> recommendToons = request.getRecommendToons();
        for (ChildFeedRequest toon : recommendToons) {
            //웹툰 데이터 없으면 웹툰 db에 삽입
            if (toonDataRepository.findByTitle(toon.getTitle()).isEmpty()) {
                toonDataRepository.save(ToonData.builder()
                        .title(toon.getTitle())
                        .imageUrl(toon.getImageUrl())
                        .siteUrl(toon.getSiteUrl())
                        .rating(toon.getStarring())
                        .days(toon.getDays())
                        .build());
            }
            //클라이언트로 반환 해줄 때 해시태그 set으로 반환해주기 위해 '#'으로 구분자 만들어서 string으로 변환
            StringBuilder vibes = new StringBuilder();
            for (String hashtagVibe : toon.getHashtagVibe()) {
                vibes.append("#");
                vibes.append(hashtagVibe);
                hashtagsVibe.append(vibes);
            }
            StringBuilder genres = new StringBuilder();
            for (String hashtagGenre : toon.getHashtagGenre()) {
                genres.append("#").append(hashtagGenre);
                hashtagsGenre.append(genres);
            }
            // 자식 피드 생성 후 저장 및 부모 피드에 담기
            Feed childfeed = Feed.builder()
                    .toon(toonDataRepository.findByTitle(toon.getTitle())
                            .orElseThrow())
                    .title(toon.getTitle())
                    .rating(toon.getStarring())
                    .hashtagVibe(vibes.toString())
                    .hashtagGenre(genres.toString())
                    .parentFeed(parentFeed)
                    .build();
            parentFeed.getChildFeed().add(childfeed);
            feedRepository.save(childfeed);
        }
        //부모 피드 해시태그에 저장
        parentFeed.setHashtagGenre(hashtagsGenre.toString());
        parentFeed.setHashtagVibe(hashtagsVibe.toString());

        return FeedInfoResponse.fromEntity(feedRepository.save(parentFeed));

    }

    @Transactional
    public List<FeedInfoResponse> searchAllParentFeed(String token) {
        List<Feed> feedList = feedRepository.findAllByParentFlag(true);
        return feedList.stream().map(FeedInfoResponse::fromEntity).toList();
    }

    @Transactional
    public List<FeedInfoResponse> searchAllMyParentFeed(String token) {
        Member member = tokenProvider.getMemberFromToken(token);
        List<Feed> feedList = feedRepository.findAllByParentFlagAndWriterId(true, member.getId());
        return feedList.stream().map(FeedInfoResponse::fromEntity).toList();
    }

    @Transactional
    public List<FeedInfoResponse> searchAllParentFeedByMember(String token, Long memberId) {
        List<Feed> feedList = feedRepository.findAllByParentFlagAndWriterId(true, memberId);
        return feedList.stream().map(FeedInfoResponse::fromEntity).toList();
    }

    @Transactional
    public FeedInfoResponse searchDetailFeed(String token, Long parentFeedId) {
        Feed feed = feedRepository.findById(parentFeedId)
                .orElseThrow(FeedDoseNotExistException::new);
        return FeedInfoResponse.fromEntity(feed);
    }
}
