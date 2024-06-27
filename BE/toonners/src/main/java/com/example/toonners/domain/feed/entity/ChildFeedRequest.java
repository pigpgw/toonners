package com.example.toonners.domain.feed.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Entity(name = "CHILD_FEED_REQUEST")
public class ChildFeedRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CHILD_FEED_REQUEST_ID")
    private Long id;
    private Float starring;
    private Set<String> hashtagGenre;
    private Set<String> hashtagVibe;
    private String title;
    private String imageUrl;
    private String siteUrl;
    private Float rating;
    private List<String> days;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FEED_ID")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Feed feed;
}
