package com.example.toonners.domain.member.dto.request;

import com.example.toonners.config.constant.Role;
import com.example.toonners.domain.toondata.dto.request.ToonInsertRequest;
import lombok.*;

import java.util.Set;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignUpRequest {

    private String email;
    private String nickname;
    private String description;
    private String image;
    private Set<ToonInsertRequest> favoriteToons;
    private Set<ToonInsertRequest> watchingToons;

    private Role role;
    private String oauthType;

    private String password;

}
