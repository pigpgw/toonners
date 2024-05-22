package com.example.toonners.domain.member.dto.request;

import lombok.*;

import java.util.Set;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateMemberRequest {
    private String nickname;
    private String description;
    private String image;
    private Set<String> favoriteToons;
    private Set<String> watchingToons;
}
