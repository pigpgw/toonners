package com.example.toonners.domain.feed.dto.response;

import com.example.toonners.domain.feed.entity.Feed;
import lombok.*;

import java.util.Arrays;
import java.util.HashSet;
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

    public static ChildFeedResponse fromEntity(Feed feed) {

        String hashtagsGenre = feed.getHashtagGenre().replaceAll("#", " ").trim();
        Set<String> hashtagGenreSet = new HashSet<>(Arrays.asList(hashtagsGenre.split(" ")));

        String hashtagsVibe = feed.getHashtagVibe().replaceAll("#", " ").trim();
        Set<String> hashtagVibeSet = new HashSet<>(Arrays.asList(hashtagsVibe.split(" ")));

        return ChildFeedResponse.builder()
                .starring(feed.getRating())
                .hashtagGenre(hashtagGenreSet)
                .hashtagVibe(hashtagVibeSet)
                .toonName(feed.getToon().getTitle())
                .toonImage(feed.getToon().getImageUrl())
                .build();
    }
}
