export interface FeedListConfig {
  parentFeedId: number;
  writerMemberId: number;
  writerMemberImage: string;
  writerMemberNickname: string;
  feedTitle: string;
  feedContexts: string;
  hashtagsVibe: string[];
  hashtagsGenre: string[];
  childFeedList: ChildFeedListConfig[];
  bookmarked: boolean;
  liked: boolean;
  likeCount: number | null;
}

export interface ChildFeedListConfig {
  hashtagGenre: string[];
  hashtagVibe: string[];
  starring: number;
  toonImage: string;
  toonName: string;
  toonSiteUrl: string;
}

export const initialFeedList: FeedListConfig = {
  parentFeedId: 0,
  writerMemberId: 0,
  writerMemberNickname: "",
  writerMemberImage: "",
  feedTitle: "",
  feedContexts: "",
  hashtagsVibe: [],
  hashtagsGenre: [],
  childFeedList: [
    {
      starring: 0,
      hashtagGenre: [],
      hashtagVibe: [],
      toonName: "",
      toonImage: "",
      toonSiteUrl: "",
    },
  ],
  bookmarked: false,
  liked: false,
  likeCount: null,
};