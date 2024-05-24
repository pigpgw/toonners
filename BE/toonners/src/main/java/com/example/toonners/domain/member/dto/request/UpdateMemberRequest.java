package com.example.toonners.domain.member.dto.request;

import com.example.toonners.domain.toondata.dto.request.ToonInsertRequest;
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
    private Set<ToonInsertRequest> favoriteToons;
    private Set<ToonInsertRequest> watchingToons;
}
