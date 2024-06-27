package com.example.toonners.domain.feed.dto.request;

import com.example.toonners.domain.feed.entity.ChildFeedRequest;
import lombok.*;

import java.util.List;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateFeedRequest {
    private String title;
    private String context;
    private List<ChildFeedRequest> recommendToons;
}
