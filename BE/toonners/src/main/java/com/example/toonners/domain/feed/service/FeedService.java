package com.example.toonners.domain.feed.service;

import com.example.toonners.config.jwt.TokenProvider;
import com.example.toonners.domain.bookmark.entity.Bookmark;
import com.example.toonners.domain.bookmark.repository.BookmarkRepository;
import com.example.toonners.domain.chatRoom.entity.ChatRoom;
import com.example.toonners.domain.chatRoom.repository.ChatRoomRepository;
import com.example.toonners.domain.feed.dto.request.CreateFeedRequest;
import com.example.toonners.domain.feed.dto.request.UpdateFeedRequest;
import com.example.toonners.domain.feed.dto.response.FeedInfoResponse;
import com.example.toonners.domain.feed.entity.ChildFeed;
import com.example.toonners.domain.feed.entity.Feed;
import com.example.toonners.domain.feed.repository.ChildFeedRepository;
import com.example.toonners.domain.feed.repository.FeedRepository;
import com.example.toonners.domain.like.repository.LikeRepository;
import com.example.toonners.domain.member.entity.Member;
import com.example.toonners.domain.toondata.entity.ToonData;
import com.example.toonners.domain.toondata.repository.ToonDataRepository;
import com.example.toonners.exception.feed.FeedDoseNotExistException;
import com.example.toonners.exception.member.UnauthorizedRequestException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@AllArgsConstructor
public class FeedService {

    private final FeedRepository feedRepository;
    private final TokenProvider tokenProvider;
    private final ToonDataRepository toonDataRepository;
    private final BookmarkRepository bookmarkRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final LikeRepository likeRepository;
    private final ChildFeedRepository childFeedRepository;

    @Transactional
    public FeedInfoResponse createFeed(String token, CreateFeedRequest request) {
        // 토큰으로 맴버 정보 찾기
        Member member = tokenProvider.getMemberFromToken(token);
        //
        Feed feed = Feed.builder()
                .writer(member)
                .title(request.getTitle())
                .contexts(request.getContext())
                .build();
        feedRepository.save(feed);
        // ChildFeed 리스트 생성 및 저장
        List<ChildFeed> childFeedRequests = new ArrayList<>();
        for (ChildFeed child : request.getRecommendToons()) {
            ChildFeed childFeed = ChildFeed.builder()
                    .starring(child.getStarring())
                    .hashtagGenre(child.getHashtagGenre())
                    .hashtagVibe(child.getHashtagVibe())
                    .title(child.getTitle())
                    .imageUrl(child.getImageUrl())
                    .siteUrl(child.getSiteUrl())
                    .days(child.getDays())
                    .feed(feed)
                    .build();
            childFeedRequests.add(childFeedRepository.save(childFeed));
        }
        feed.setChildFeedRequests(childFeedRequests);
        // 해시태그 정보 및 채팅방, 툰 정보 삽입
        return getFeedInfoResponseWithHashtagAndToon(childFeedRequests, feed, null, null);
    }

    @Transactional
    public FeedInfoResponse updateFeed(String token, Long feedId, UpdateFeedRequest request) {
        Member member = tokenProvider.getMemberFromToken(token);
        Feed feed = feedRepository.findById(feedId).orElseThrow(FeedDoseNotExistException::new);
        if (!member.getId().equals(feed.getWriter().getId())) {
            throw new UnauthorizedRequestException();
        }
        List<ChildFeed> beforeChildFeedList = feed.getChildFeedRequests();
        feed.updateFields(request);
        // 새로운 ChildFeed 리스트 생성 및 설정
        List<ChildFeed> childFeedRequests = new ArrayList<>();
        if (request.getRecommendToons() != null) {
            for (ChildFeed child : request.getRecommendToons()) {
                ChildFeed childFeed = ChildFeed.builder()
                        .starring(child.getStarring())
                        .hashtagGenre(child.getHashtagGenre())
                        .hashtagVibe(child.getHashtagVibe())
                        .title(child.getTitle())
                        .imageUrl(child.getImageUrl())
                        .siteUrl(child.getSiteUrl())
                        .days(child.getDays())
                        .feed(feed)
                        .build();
                childFeedRequests.add(childFeedRepository.save(childFeed));
            }
        }
        feed.setChildFeedRequests(childFeedRequests);
        // 해시태그 저장 및 채팅방 별점 추가, db 데이터 삽입
        return getFeedInfoResponseWithHashtagAndToon(childFeedRequests, feed, beforeChildFeedList, member);
    }

    @Transactional
    public List<FeedInfoResponse> searchAllParentFeed(String token) {
        // 북마크 정보 알기 위한 맴버 정보 조회
        Member member = tokenProvider.getMemberFromToken(token);
        // 보여줄 피드 리스트
        List<Feed> feedList = feedRepository.findAll();
        // response 로 변환
        List<FeedInfoResponse> feedInfoResponses = getFeedInfoResponsesWithLiked(member, feedList);
        return feedInfoResponses;
    }

    @Transactional
    public List<FeedInfoResponse> searchAllMyParentFeed(String token) {
        Member member = tokenProvider.getMemberFromToken(token);
        List<Feed> feedList = feedRepository.findAllByWriterId(member.getId());
        List<FeedInfoResponse> feedInfoResponses = getFeedInfoResponsesWithLiked(member, feedList);
        return feedInfoResponses;
    }

    @Transactional
    public List<FeedInfoResponse> searchAllParentFeedByMember(String token, Long memberId) {
        Member member = tokenProvider.getMemberFromToken(token);
        List<Feed> feedList = feedRepository.findAllByWriterId(memberId);
        List<FeedInfoResponse> feedInfoResponses = getFeedInfoResponsesWithLiked(member, feedList);
        return feedInfoResponses;
    }

    @Transactional
    public FeedInfoResponse searchDetailFeed(String token, Long parentFeedId) {
        Member member = tokenProvider.getMemberFromToken(token);
        Feed feed = feedRepository.findById(parentFeedId)
                .orElseThrow(FeedDoseNotExistException::new);
        // 북마크나 좋아요 같은 개인화 정보 삽입 후 반환
        return getFeedInfoResponseWithBookmarkAndLike(member, feed);
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
        List<FeedInfoResponse> feedInfoResponses = getFeedInfoResponsesWithLiked(member, feedList);
        return feedInfoResponses;
    }

    @Transactional
    public void deleteFeed(String token, Long feedId) {
        Member member = tokenProvider.getMemberFromToken(token);
        Feed feed = feedRepository.findById(feedId).orElseThrow(FeedDoseNotExistException::new);
        if (!member.getId().equals(feed.getWriter().getId())) {
            throw new UnauthorizedRequestException();
        }
        feedRepository.delete(feed);
    }

    // 내부 메서드
    private FeedInfoResponse getFeedInfoResponseWithBookmarkAndLike(Member member, Feed feed) {
        FeedInfoResponse feedInfoResponse = FeedInfoResponse.fromEntity(feed);
        if (bookmarkRepository.findByMemberIdAndFeedIdAndBookmarkType(
                member.getId(), feed.getId(), "feed").isPresent()) {
            feedInfoResponse.setBookmarked(true);
        }
        if (likeRepository.findByMemberAndFeed(member, feed).isPresent()) {
            feedInfoResponse.setLiked(true);
        }
        return feedInfoResponse;
    }

    private FeedInfoResponse getFeedInfoResponseWithHashtagAndToon(
            List<ChildFeed> request, Feed feed,
            List<ChildFeed> beforeRequest, Member member) {
        // 새로 추가한 웹툰 있으면 해당 웹툰방 별점 추가
        if (beforeRequest != null) {
            Set<ChildFeed> beforeRequestSet = new HashSet<>(beforeRequest);
            Set<ChildFeed> requestSet = new HashSet<>(request);
            beforeRequestSet.removeAll(requestSet);
            for (ChildFeed toon : beforeRequestSet) {
                Optional<ChatRoom> optionalChatRoom = chatRoomRepository.findByToonName(toon.getTitle());
                optionalChatRoom.ifPresent(chatRoom -> {
                    // 채팅방 별점 = total_point / count
                    // 웹툰 추천 시 별점 채팅방 총 별점에 추가
                    chatRoom.setRatingTotalPoint(
                            Optional.ofNullable(chatRoom.getRatingTotalPoint())
                                    .orElse(0F) + toon.getStarring());

                    // 웹툰 추천 시 별점 count 1 증가
                    chatRoom.setRatingCount(
                            Optional.ofNullable(chatRoom.getRatingCount())
                                    .orElse(0L) + 1L);

                    chatRoomRepository.save(chatRoom);
                });
            }
        }
        // 해시태그 변경
        StringBuilder hashtagsGenre = new StringBuilder();
        StringBuilder hashtagsVibe = new StringBuilder();
        for (ChildFeed toon : request) {
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
            // 채팅방 별점 삽입
            Optional<ChatRoom> optionalChatRoom = chatRoomRepository.findByToonName(toon.getTitle());
            optionalChatRoom.ifPresent(chatRoom -> {
                // 채팅방 별점 = total_point / count
                // 웹툰 추천 시 별점 채팅방 총 별점에 추가
                chatRoom.setRatingTotalPoint(
                        Optional.ofNullable(chatRoom.getRatingTotalPoint())
                                .orElse(0F) + toon.getStarring());

                // 웹툰 추천 시 별점 count 1 증가
                chatRoom.setRatingCount(
                        Optional.ofNullable(chatRoom.getRatingCount())
                                .orElse(0L) + 1L);

                chatRoomRepository.save(chatRoom);
            });
            //클라이언트로 반환 해줄 때 해시태그 set으로 반환해주기 위해 '#'으로 구분자 만들어서 string으로 변환
            StringBuilder vibes = new StringBuilder();
            if (toon.getHashtagVibe() != null) {
                for (String hashtagVibe : toon.getHashtagVibe()) {
                    vibes.append("#").append(hashtagVibe);
                }
            }
            hashtagsVibe.append(vibes);
            StringBuilder genres = new StringBuilder();
            if (toon.getHashtagGenre() != null) {
                for (String hashtagGenre : toon.getHashtagGenre()) {
                    genres.append("#").append(hashtagGenre);
                }
            }
            hashtagsGenre.append(genres);
        }
        //부모 피드 해시태그에 저장
        feed.setHashtagGenre(hashtagsGenre.toString());
        feed.setHashtagVibe(hashtagsVibe.toString());
        if (member == null) {
            return FeedInfoResponse.fromEntity(feedRepository.save(feed));
        }
        Feed updateFeed = feedRepository.save(feed);
        // 북마크나 좋아요 같은 개인화 정보 삽입 후 반환
        return getFeedInfoResponseWithBookmarkAndLike(member, updateFeed);
    }

    private List<FeedInfoResponse> getFeedInfoResponsesWithLiked(Member member, List<Feed> feedList) {
        List<FeedInfoResponse> feedInfoResponses = feedList.stream()
                .map(FeedInfoResponse::fromEntity).toList();
        // 피드 id와 맴버 id 로 북마크 객체 조회 및 response에 내 북마크 정보 삽입.
        for (int i = 0; i < feedInfoResponses.size(); i++) {
            Feed feed = feedList.get(i);
            FeedInfoResponse feedInfoResponse = feedInfoResponses.get(i);
            if (likeRepository.findByMemberAndFeed(member, feed).isPresent()) {
                feedInfoResponse.setLiked(true);
            }
        }
        return feedInfoResponses;
    }
}
