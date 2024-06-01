package com.example.toonners.domain.feed.dto.response;

import com.example.toonners.domain.feed.entity.Feed;
import lombok.*;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeedInfoResponse {
    private Long parentFeedId;
    private Long writerMemberId;
    private String writerMemberNickname;
    private String writerMemberImage;
    private String feedTitle;
    private String feedContexts;
    private Set<String> hashtags;
    private Set<ChildFeedResponse> childFeedList;

    private boolean bookmarked;
    private boolean liked;
    private Long likeCount;

    public static FeedInfoResponse fromEntity(Feed feed) {

        String hasgtagsString = feed.getHashtagVibe() + feed.getHashtagGenre();
        hasgtagsString = hasgtagsString.replaceAll("#", " ").trim();
        Set<String> hashtagSet = new HashSet<>(Arrays.asList(hasgtagsString.split(" ")));
        return FeedInfoResponse.builder()
                .parentFeedId(feed.getId())
                .writerMemberId(feed.getWriter().getId())
                .writerMemberNickname(feed.getWriter().getNickname())
                .writerMemberImage(feed.getWriter().getImage())
                .feedTitle(feed.getTitle())
                .feedContexts(feed.getContexts())
                .hashtags(hashtagSet)
                .childFeedList(feed.getChildFeed().stream()
                        .map(ChildFeedResponse::fromEntity).collect(Collectors.toSet()))
                .likeCount(feed.getLikeCounts())
                .build();
    }
}
