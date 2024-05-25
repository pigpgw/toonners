package com.example.toonners.domain.member.service;

import com.example.toonners.config.constant.Role;
import com.example.toonners.config.jwt.TokenProvider;
import com.example.toonners.domain.member.dto.request.SignInRequest;
import com.example.toonners.domain.member.dto.request.SignUpRequest;
import com.example.toonners.domain.member.dto.request.UpdateMemberRequest;
import com.example.toonners.domain.member.dto.response.InfoResponse;
import com.example.toonners.domain.member.entity.Member;
import com.example.toonners.domain.member.repository.MemberRepository;
import com.example.toonners.domain.toondata.dto.request.ToonInsertRequest;
import com.example.toonners.domain.toondata.entity.ToonData;
import com.example.toonners.domain.toondata.repository.ToonDataRepository;
import com.example.toonners.exception.member.DuplicatedUserException;
import com.example.toonners.exception.member.UnauthorizedRequestException;
import com.example.toonners.exception.member.UserDoesNotExistException;
import lombok.AllArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class MemberService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;
    private final ToonDataRepository toonDataRepository;

    public InfoResponse updateMember(UpdateMemberRequest request, String token) {

        Member member = tokenProvider.getMemberFromToken(token);
        String requestEmail = tokenProvider.getEmailFromToken(token);

        if (!member.getEmail().equals(requestEmail)) {
            throw new UnauthorizedRequestException();
        }

        if (request.getWatchingToons() != null) {
            Set<ToonInsertRequest> watchingToons = request.getWatchingToons();
            // set을 Iterator 안에 담기
            insertToonsToDb(watchingToons);

        }

        if (request.getFavoriteToons() != null) {
            Set<ToonInsertRequest> favoriteToons = request.getFavoriteToons();
            // set을 Iterator 안에 담기
            insertToonsToDb(favoriteToons);
        }


        member.updateFields(request);
        Member updatedMember = memberRepository.save(member);
        InfoResponse infoResponse = InfoResponse.fromEntity(updatedMember);
        infoResponse.setWatchingToons(request.getWatchingToons());
        infoResponse.setFavoriteToons(request.getFavoriteToons());

        return infoResponse;
    }

    @Transactional
    public InfoResponse searchMyInfo(String token) {
        Member member = tokenProvider.getMemberFromToken(token);
        return getInfoResponse(member);
    }

    @Transactional
    public InfoResponse searchMemberInfo(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(UserDoesNotExistException::new);
        return getInfoResponse(member);
    }

    /**
     * 기능 테스트를 위한 회원가입 및 로그인
     **/
    public void signup(SignUpRequest request) {
        boolean exists = memberRepository.existsByEmail(request.getEmail());
        if (exists) {
            throw new DuplicatedUserException();
        }

        Member member = memberRepository.save(setAccount(request));

    }

    public Member signin(SignInRequest request) {

        Member member = memberRepository.findByEmail(request.getEmail())
                .orElseThrow(RuntimeException::new);
        return member;
    }

    // 내부 메서드
    private Member setAccount(SignUpRequest request) {
        return Member.builder()
                .email(request.getEmail())
                .role(Role.MEMBER)
                .nickname(request.getNickname())
                .build();
    }

    private Set<String> insertToonsToDb(Set<ToonInsertRequest> watchingToons) {
        Set<String> titleSet = new HashSet<>();
        for (ToonInsertRequest watchingToon : watchingToons) {
            if (toonDataRepository.findByTitle(watchingToon.getTitle()).isEmpty()) {
                toonDataRepository.save(ToonData.builder()
                        .title(watchingToon.getTitle())
                        .imageUrl(watchingToon.getImageUrl())
                        .siteUrl(watchingToon.getSiteUrl())
                        .rating(watchingToon.getRating())
                        .days(watchingToon.getDays())
                        .build());
            } else {
//                throw new ChatRoomAlreadyExistException();
            }
            titleSet.add(watchingToon.getTitle());
        }
        return titleSet;
    }

    private void insertToonSetToResponse(Set<String> member, Set<ToonInsertRequest> watchingToonSet) {
        for (String toon : member) {
            ToonData toonData = toonDataRepository.findByTitle(toon).orElseThrow();
            watchingToonSet.add(ToonInsertRequest.builder()
                    .title(toonData.getTitle())
                    .imageUrl(toonData.getImageUrl())
                    .siteUrl(toonData.getSiteUrl())
                    .build());
        }
    }

    private InfoResponse getInfoResponse(Member member) {
        InfoResponse infoResponse = InfoResponse.fromEntity(member);
        //
        Set<ToonInsertRequest> favoriteToonSet = new HashSet<>();
        if (member.getFavoriteToons() != null) {
            insertToonSetToResponse(member.getFavoriteToons(), favoriteToonSet);
        }
        //
        Set<ToonInsertRequest> watchingToonSet = new HashSet<>();
        if (member.getWatchingToons() != null) {
            insertToonSetToResponse(member.getWatchingToons(), watchingToonSet);
        }
        //
        infoResponse.setFavoriteToons(favoriteToonSet);
        infoResponse.setWatchingToons(watchingToonSet);
        return infoResponse;
    }

}
