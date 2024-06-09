package com.example.toonners.domain.chatRoom.entity;

import com.example.toonners.domain.toondata.entity.ToonData;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "CHATROOM")
public class ChatRoom {
    @Id // 엔티티 내부에서 아이디임을 선언
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 시퀀스 전략 선언
    @Column(name = "CHATROOM_ID") // 아이디에 해당하는 컬럼명 선언
    private Long id;

    private String toonName;
    private String toonImageUrl;
    private String toonSiteUrl;
    //별점 매긴 총 점
    private Float ratingTotalPoint;
    //별점 매긴 사람 수
    private Long ratingCount;
    private String contexts;
    private Long fireTotalCount;
    private String updatedDays;
    private Long todayChatCount;

    @OneToOne
    private ToonData toonData;

    // 개인 상호 작용 결과 저장하는 메서드 - 북마크, 불이모지
    public void setRatingTotalPoint(Float stars) {
        this.ratingTotalPoint = stars;
    }

    public void setRatingCount(Long count) {
        this.ratingCount = count;
    }

    public void setFireTotalCount(Long count) {
        this.fireTotalCount = count;
    }

    public void setTodayChatCount(Long count) {
        this.todayChatCount = count;
    }
}
