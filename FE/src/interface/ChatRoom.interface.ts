export interface ChatRoomInfoConfig {
  chatRoomId: number;
  toonName: string;
  toonImageUrl: string;
  toonSiteUrl: string;
  contexts: string;
  rating: number;
  fireTotalCount: number;
}

export interface RankChatRoomInfoConfig extends ChatRoomInfoConfig {
  chatList: {
    chatMessage: string;
    chatRoomId: number;
    createdAt: string;
    memberId: number;
    memberImage: string;
    memberNickname: string;
  }[];
}

export interface ChatCommentConfig {
  chatRoomId: number;
  memberId: number;
  memberNickname: string;
  memberImage: string;
  chatMessage: string;
  createdAt: string;
}
