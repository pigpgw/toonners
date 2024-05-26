package com.example.toonners.domain.feed.service;

import com.example.toonners.config.jwt.TokenProvider;
import com.example.toonners.domain.bookmark.entity.Bookmark;
import com.example.toonners.domain.bookmark.repository.BookmarkRepository;
import com.example.toonners.domain.chatRoom.entity.ChatRoom;
import com.example.toonners.domain.chatRoom.repository.ChatRoomRepository;
import com.example.toonners.domain.chatRoom.service.ChatRoomService;
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
    private final BookmarkRepository bookmarkRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomService chatRoomService;

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
            if (chatRoomRepository.findByToonName(toon.getTitle()).isPresent()) {
                // 채팅방 별점 = total_point / count
                ChatRoom chatRoom = chatRoomRepository.findByToonName(toon.getTitle()).orElseThrow();
                // 웹툰 추천 시 별점 채팅방 총 별점에 추가
                chatRoom.setRatingTotalPoint(
                        (chatRoom.getRatingTotalPoint() != null)
                                ? chatRoom.getRatingTotalPoint() + toon.getStarring()
                                : toon.getStarring());
                // 웹툰 추천 시 별점 count 1 증가
                if (chatRoom.getRatingCount() != null) {
                    chatRoom.setRatingCount(chatRoom.getRatingCount() + 1L);
                } else {
                    chatRoom.setRatingCount(1L);
                }
                chatRoomRepository.save(chatRoom);
            }
            //웹툰 데이터 없으면 웹툰 db에 삽입
            if (toonDataRepository.findByTitle(toon.getTitle()).isEmpty()) {
                toonDataRepository.save(ToonData.builder()
                        .title(toon.getTitle())
                        .imageUrl(toon.getImageUrl())
                        .siteUrl(toon.getSiteUrl())
                        .rating(toon.getRating())
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
        // 북마크 정보 알기 위한 맴버 정보 조회
        Member member = tokenProvider.getMemberFromToken(token);
        // 보여줄 피드 리스트
        List<Feed> feedList = feedRepository.findAllByParentFlag(true);
        // response 로 변환
        List<FeedInfoResponse> feedInfoResponses = getFeedInfoResponses(member, feedList);
        return feedInfoResponses;
    }

    @Transactional
    public List<FeedInfoResponse> searchAllMyParentFeed(String token) {
        Member member = tokenProvider.getMemberFromToken(token);
        List<Feed> feedList = feedRepository.findAllByParentFlagAndWriterId(true, member.getId());
        List<FeedInfoResponse> feedInfoResponses = getFeedInfoResponses(member, feedList);
        return feedInfoResponses;
    }

    @Transactional
    public List<FeedInfoResponse> searchAllParentFeedByMember(String token, Long memberId) {
        Member member = tokenProvider.getMemberFromToken(token);
        List<Feed> feedList = feedRepository.findAllByParentFlagAndWriterId(true, memberId);
        List<FeedInfoResponse> feedInfoResponses = getFeedInfoResponses(member, feedList);
        return feedInfoResponses;
    }

    @Transactional
    public FeedInfoResponse searchDetailFeed(String token, Long parentFeedId) {
        Member member = tokenProvider.getMemberFromToken(token);
        Feed feed = feedRepository.findById(parentFeedId)
                .orElseThrow(FeedDoseNotExistException::new);
        FeedInfoResponse feedInfoResponse = FeedInfoResponse.fromEntity(feed);
        if (bookmarkRepository.findByMemberIdAndFeedIdAndBookmarkType(
                member.getId(), feed.getId(), "feed").isPresent()) {
            feedInfoResponse.setBookmarked(true);
        }
        return feedInfoResponse;
    }

    @Transactional
    public List<FeedInfoResponse> searchBookmarkedFeeds(String token) {
        Member member = tokenProvider.getMemberFromToken(token);
        List<FeedInfoResponse> feedInfoResponses = bookmarkRepository.findByMemberIdAndBookmarkType(member.getId(), "feed")
                .stream().map(Bookmark::getFeed).map(FeedInfoResponse::fromEntity).toList();
        for (FeedInfoResponse feedInfoResponse : feedInfoResponses) {
            feedInfoResponse.setBookmarked(true);
        }
        return feedInfoResponses;
    }

    @Transactional
    public List<FeedInfoResponse> searchAllParentFeedByPartOfTitle(String token, String partOfTitle) {
        Member member = tokenProvider.getMemberFromToken(token);
        List<Feed> feedList = feedRepository.findAllByTitleContains(partOfTitle);
        List<FeedInfoResponse> feedInfoResponses = getFeedInfoResponses(member, feedList);
        return feedInfoResponses;
    }

    // 내부 메서드
    private List<FeedInfoResponse> getFeedInfoResponses(Member member, List<Feed> feedList) {
        List<FeedInfoResponse> feedInfoResponses = feedList.stream()
                .map(FeedInfoResponse::fromEntity).toList();
        // 피드 id와 맴버 id 로 북마크 객체 조회 및 response에 내 북마크 정보 삽입.
        for (int i = 0; i < feedInfoResponses.size(); i++) {
            Feed feed = feedList.get(i);
            FeedInfoResponse feedInfoResponse = feedInfoResponses.get(i);
            if (bookmarkRepository.findByMemberIdAndFeedIdAndBookmarkType(
                    member.getId(), feed.getId(), "feed").isPresent()) {
                feedInfoResponse.setBookmarked(true);
            }
        }
        return feedInfoResponses;
    }
}
