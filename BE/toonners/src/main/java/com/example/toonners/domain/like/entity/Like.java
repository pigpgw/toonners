package com.example.toonners.domain.like.entity;

import com.example.toonners.domain.feed.entity.Feed;
import com.example.toonners.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "Like")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LIKE_ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FEED_ID")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Feed feed;
}
