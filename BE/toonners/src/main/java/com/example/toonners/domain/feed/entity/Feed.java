package com.example.toonners.domain.feed.entity;

import com.example.toonners.common.BaseEntity;
import com.example.toonners.domain.member.entity.Member;
import com.example.toonners.domain.toondata.entity.ToonData;
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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TOONDATA_ID")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ToonData toon;

    private String title;
    private String contexts;
    private Float rating;
    private String hashtagGenre;
    private String hashtagVibe;

    private boolean parentFlag;
    @ManyToOne(fetch = FetchType.LAZY)
    private Feed parentFeed;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "parentFeed", orphanRemoval = true)
    private List<Feed> childFeed = new LinkedList<>();

    private Long likeCounts = 0L;


    public void setHashtagGenre(String hashtagGenre) {
        this.hashtagGenre = hashtagGenre;
    }

    public void setHashtagVibe(String hashtagVibe) {
        this.hashtagVibe = hashtagVibe;
    }
    public void setLikeCounts(Long counts) {
        this.likeCounts = counts;
    }
}
