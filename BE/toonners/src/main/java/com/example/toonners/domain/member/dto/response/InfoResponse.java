package com.example.toonners.domain.member.dto.response;

import com.example.toonners.domain.member.entity.Member;
import com.example.toonners.domain.toondata.dto.request.ToonInsertRequest;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InfoResponse {
    private Long id;
    private String email;
    private String nickname;
    private String description;
    private String image;
    private Set<ToonInsertRequest> favoriteToons;
    private Set<ToonInsertRequest> watchingToons;

    public static InfoResponse fromEntity(Member member) {
        Set<ToonInsertRequest> favoriteToonSet = new HashSet<>();
        Set<ToonInsertRequest> watchingToonSet = new HashSet<>();
        return InfoResponse.builder()
                .id(member.getId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .description(member.getDescription())
                .image(member.getImage())
                .favoriteToons(favoriteToonSet)
                .watchingToons(watchingToonSet)
                .build();
    }
}
