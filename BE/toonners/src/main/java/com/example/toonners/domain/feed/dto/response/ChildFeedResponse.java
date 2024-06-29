package com.example.toonners.domain.feed.dto.response;

import com.example.toonners.domain.feed.entity.ChildFeed;
import lombok.*;

import java.util.Set;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChildFeedResponse {
    private Float starring;
    private Set<String> hashtagGenre;
    private Set<String> hashtagVibe;
    private String toonName;
    private String toonImage;
    private String toonSiteUrl;

    public static ChildFeedResponse fromRequest(ChildFeed request) {
        return ChildFeedResponse.builder()
                .starring(request.getStarring())
                .hashtagGenre(request.getHashtagGenre())
                .hashtagVibe(request.getHashtagVibe())
                .toonName(request.getTitle())
                .toonImage(request.getImageUrl())
                .toonSiteUrl(request.getSiteUrl())
                .build();
    }
}
