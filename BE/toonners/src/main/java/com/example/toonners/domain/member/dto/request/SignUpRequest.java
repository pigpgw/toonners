package com.example.toonners.domain.member.dto.request;

import com.example.toonners.config.constant.Role;
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
    private Set<String> keywords;
    private Set<String> favoriteToons;
    private Set<String> watchingToons;

    private Role role;
    private String oauthType;

}
