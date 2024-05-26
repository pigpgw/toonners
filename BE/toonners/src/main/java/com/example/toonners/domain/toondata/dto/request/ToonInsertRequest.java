package com.example.toonners.domain.toondata.dto.request;

import lombok.*;

import java.util.List;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ToonInsertRequest {
    private String title;
    private String imageUrl;
    private String siteUrl;
    private Float rating;
    private List<String> days;
}
