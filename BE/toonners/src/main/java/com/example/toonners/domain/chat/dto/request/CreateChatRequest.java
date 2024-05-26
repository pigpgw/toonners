package com.example.toonners.domain.chat.dto.request;

import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateChatRequest {

    private Long toonDataId;
    private Long chatRoomId;
    private String contexts;
}
