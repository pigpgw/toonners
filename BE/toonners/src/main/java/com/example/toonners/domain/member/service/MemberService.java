package com.example.toonners.domain.member.service;

import com.example.toonners.domain.member.entity.Member;
import com.example.toonners.domain.member.repository.MemberRepository;
import com.example.toonners.exception.member.UserDoesNotExistException;
import lombok.AllArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MemberService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    public Member loadUserByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(UserDoesNotExistException::new);
    }

}
