package com.example.toonners.domain.feed.entity;

import com.example.toonners.common.BaseEntity;
import com.example.toonners.domain.feed.dto.request.UpdateFeedRequest;
import com.example.toonners.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.LinkedList;
import java.util.List;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "FEED")
public class Feed extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FEED_ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member writer;

    private String title;
    private String contexts;
    private Float rating;
    private String hashtagGenre;
    private String hashtagVibe;

    private Long likeCounts = 0L;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "feed", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChildFeed> childFeedRequests;

    public void updateFields(UpdateFeedRequest request) {
        if (request.getTitle() != null) {
            title = request.getTitle();
        }
        if (request.getContext() != null) {
            contexts = request.getContext();
        }
    }

    public void setHashtagGenre(String hashtagGenre) {
        this.hashtagGenre = hashtagGenre;
    }

    public void setHashtagVibe(String hashtagVibe) {
        this.hashtagVibe = hashtagVibe;
    }

    public void setLikeCounts(Long counts) {
        this.likeCounts = counts;
    }

    public void setChildFeedRequests(List<ChildFeed> newChildFeeds) {
        if (this.childFeedRequests == null) {
            this.childFeedRequests = new LinkedList<>();
        }
        // 기존 리스트 클리어
        this.childFeedRequests.clear();
        // 새로운 리스트 추가
        if (newChildFeeds != null) {
            this.childFeedRequests.addAll(newChildFeeds);
        }
    }
}
