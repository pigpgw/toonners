package com.example.toonners.domain.member.dto.response;

import com.example.toonners.domain.member.entity.Member;
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
    private Set<String> favoriteToons;
    private Set<String> watchingToons;

    public static InfoResponse fromEntity(Member member) {
        Set<String> favoriteToonSet = new HashSet<>();
        Set<String> watchingToonSet = new HashSet<>();

        if (member.getFavoriteToons() != null) {
            favoriteToonSet = member.getFavoriteToons();
        }
        if (member.getWatchingToons() != null) {
            watchingToonSet = member.getWatchingToons();
        }
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
