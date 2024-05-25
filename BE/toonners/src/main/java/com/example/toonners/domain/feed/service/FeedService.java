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

        Member member = tokenProvider.getMemberFromToken(token);
        Feed parentFeed = Feed.builder()
                .writer(member)
                .title(request.getTitle())
                .contexts(request.getContext())
                .childFeed(new LinkedList<>())
                .parentFlag(true)
                .build();

        StringBuilder hashtagsGenre = new StringBuilder();
        StringBuilder hashtagsVibe = new StringBuilder();

        feedRepository.save(parentFeed);

        List<ChildFeedRequest> recommendToons = request.getRecommendToons();
        for (ChildFeedRequest toon : recommendToons) {
            if (toonDataRepository.findByTitle(toon.getTitle()).isEmpty()) {
                toonDataRepository.save(ToonData.builder()
                        .title(toon.getTitle())
                        .imageUrl(toon.getImageUrl())
                        .siteUrl(toon.getSiteUrl())
                        .rating(toon.getStarring())
                        .days(toon.getDays())
                        .build());
            }
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
        parentFeed.setHashtagGenre(hashtagsGenre.toString());
        parentFeed.setHashtagVibe(hashtagsVibe.toString());

        return FeedInfoResponse.fromEntity(feedRepository.save(parentFeed));

    }

}
