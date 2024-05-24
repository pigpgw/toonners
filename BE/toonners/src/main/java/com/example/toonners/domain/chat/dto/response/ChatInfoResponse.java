package com.example.toonners.domain.chat.dto.response;

import com.example.toonners.domain.chat.entity.Chat;
import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatInfoResponse {

    private Long chatRoomId;
    private Long memberId;
    private String memberNickname;
    private String memberImage;
    private String chatMessage;
    private String createdAt;

    public static ChatInfoResponse fromEntity(Chat chat) {
        return ChatInfoResponse.builder()
                .chatRoomId(chat.getChatRoom().getId())
                .memberId(chat.getChatMember().getId())
                .memberNickname(chat.getChatMember().getNickname())
                .memberImage(chat.getChatMember().getImage())
                .chatMessage(chat.getContexts())
                .createdAt(chat.getCreatedAt())
                .build();
    }
}
