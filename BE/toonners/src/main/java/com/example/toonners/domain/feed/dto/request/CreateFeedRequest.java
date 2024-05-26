package com.example.toonners.domain.feed.dto.request;

import lombok.*;

import java.util.List;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateFeedRequest {

    private String title;
    private String context;
    private List<ChildFeedRequest> recommendToons;

}
