package com.example.toonners.domain.chatRoom.dto.request;

import lombok.*;

import java.util.List;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateChatRoomRequest {

    private Long toonDataId;
    private String toonName;
    private String toonImage;
    private String toonUrl;
    private Float fanCounts;
    private List<String> updateDay;
    private String contexts;

}
