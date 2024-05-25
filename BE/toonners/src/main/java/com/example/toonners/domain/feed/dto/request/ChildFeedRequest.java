package com.example.toonners.domain.feed.dto.request;

import lombok.*;

import java.util.List;
import java.util.Set;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChildFeedRequest {
    private Float starring;
    private Set<String> hashtagGenre;
    private Set<String> hashtagVibe;
    private String title;
    private String imageUrl;
    private String siteUrl;
    private Float rating;
    private List<String> days;
}
