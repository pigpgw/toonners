export interface ChatRoomInfoConfig {
  chatRoomId: number;
  toonName: string;
  toonImageUrl: string;
  toonSiteUrl: string;
  contexts: string;
  rating: number;
  fireTotalCount: number;
}

export interface ChatCommentConfig {
  chatRoomId: number;
  memberId: number;
  memberNickname: string;
  memberImage: string;
  chatMessage: string;
  createdAt: string;
}
