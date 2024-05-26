package com.example.toonners.config.security;

import com.example.toonners.config.jwt.filter.JwtAuthenticationFilter;
import com.example.toonners.domain.member.service.MemberService;
import com.example.toonners.exception.handler.OAuth.OAuthLoginFailureHandler;
import com.example.toonners.exception.handler.OAuth.OAuthLoginSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Autowired
    OAuthLoginSuccessHandler oAuthLoginSuccessHandler;

    @Autowired
    OAuthLoginFailureHandler oAuthLoginFailureHandler;

    @Autowired
    MemberService memberService;

    private final JwtAuthenticationFilter authenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {


        http     // rest api 설정
                .csrf(AbstractHttpConfigurer::disable)
                // csrf 비활성화 -> cookie를 사용하지 않으면 꺼도 된다.
                // (cookie를 사용할 경우 httpOnly(XSS 방어), sameSite(CSRF 방어)로 방어해야 한다.)
                .sessionManagement(
                        session -> session.sessionCreationPolicy
                                (SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> {
                    try {
                        authorize
                                .requestMatchers("/login/**", "/oauth2/**",
                                        "/toondata", "/**")
                                .permitAll() // 해당 경로는 인증 없이 접근 가능
                                .requestMatchers("/member/**") // 해당 경로는 인증이 필요
                                .hasRole("MEMBER") // ROLE 이 MEMBER 가 포함된 경우에만 인증 가능
                        ;
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                })
                // oauth2 설정
                .oauth2Login(oauth -> // OAuth2 로그인 기능에 대한 여러 설정의 진입점
                        // OAuth2 로그인 성공 이후 사용자 정보를 가져올 때의 설정을 담당
                        oauth.userInfoEndpoint(c -> c.userService(memberService))
                                // 로그인 성공 시 핸들러
                                .successHandler(oAuthLoginSuccessHandler)
                                .failureHandler(oAuthLoginFailureHandler)
                )
                // jwt 관련 설정
                .addFilterBefore(this.authenticationFilter,
                        UsernamePasswordAuthenticationFilter.class)
        ;
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

}
