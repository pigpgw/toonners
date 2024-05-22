package com.example.toonners.domain.member.entity;

import com.example.toonners.common.BaseEntity;
import com.example.toonners.config.constant.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Set;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "MEMBER")
public class Member extends BaseEntity {
    @Id // 엔티티 내부에서 아이디임을 선언
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 시퀀스 전략 선언
    @Column(name = "MEMBER_ID") // 아이디에 해당하는 컬럼명 선언
    private Long id;

    private String email;
    private String nickname;
    private String description;
    private String image;
    private Set<String> keywords;
    private Set<String> favoriteToons;
    private Set<String> watchingToons;

    @Enumerated(EnumType.STRING)
    private Role role;
    private String oauthType;

    public Collection<? extends GrantedAuthority> getAuthorities() {
        Role userRole = this.getRole();
        String authority = userRole.getKey();
        SimpleGrantedAuthority simpleAuthority = new SimpleGrantedAuthority(authority);
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(simpleAuthority);

        return authorities;
    }

}
