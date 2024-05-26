package com.example.toonners.domain.fire.dto.request;

import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateFireRequest {
    private Long chatRoomId;
}
