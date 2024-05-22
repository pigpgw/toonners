package com.example.toonners.domain.member.service;

import com.example.toonners.config.jwt.TokenProvider;
import com.example.toonners.domain.member.dto.request.UpdateMemberRequest;
import com.example.toonners.domain.member.dto.response.InfoResponse;
import com.example.toonners.domain.member.entity.Member;
import com.example.toonners.domain.member.repository.MemberRepository;
import com.example.toonners.exception.member.UnauthorizedRequestException;
import com.example.toonners.exception.member.UserDoesNotExistException;
import lombok.AllArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MemberService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;

    public InfoResponse updateMember(Long memberId
            , UpdateMemberRequest request, String token) {

        Member member = memberRepository.findById(memberId)
                .orElseThrow(UserDoesNotExistException::new);
        String requestEmail = tokenProvider.getEmailFromToken(token);

        if (!member.getEmail().equals(requestEmail)) {
            throw new UnauthorizedRequestException();
        }

        member.updateFields(request);
        Member updatedMember = memberRepository.save(member);

        return InfoResponse.fromEntity(updatedMember);
    }

}
