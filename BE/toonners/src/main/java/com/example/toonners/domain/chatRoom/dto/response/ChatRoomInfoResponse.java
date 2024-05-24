package com.example.toonners.domain.chatRoom.dto.response;

import com.example.toonners.domain.chatRoom.entity.ChatRoom;
import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoomInfoResponse {
    private Long chatRoomId;
    private String toonName;
    private String toonImageUrl;
    private String toonSiteUrl;
    private Float rating;
    private String contexts;
    private Long fireTotalCount;

    public static ChatRoomInfoResponse fromEntity(ChatRoom chatRoom) {
        float rating = 0f;
        if (chatRoom.getRatingCount() != null && chatRoom.getRatingCount() > 0) {
            rating = chatRoom.getRatingTotalPoint() / chatRoom.getRatingCount();
        }
        return ChatRoomInfoResponse.builder()
                .chatRoomId(chatRoom.getId())
                .toonName(chatRoom.getToonName())
                .toonImageUrl(chatRoom.getToonImageUrl())
                .toonSiteUrl(chatRoom.getToonSiteUrl())
                .rating(rating)
                .contexts(chatRoom.getContexts())
                .fireTotalCount(chatRoom.getFireTotalCount())
                .build();
    }
}
