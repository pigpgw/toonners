export interface FeedListConfig {
  parentFeedId: number;
  bookmarked: boolean;

  childFeedList: ChildFeedListConfig[];
  feedContexts: string;
  feedTitle: string;
  hashtags: string[];
  writerMemberId: number;
  writerMemberImage: string;
  writerMemberNickname: string;
}

export interface ChildFeedListConfig {
  hashtagGenre: string[];
  hashtagVibe: string[];
  starring: number;
  toonImage: string;
  toonName: string;
}

export const initialFeedList = {
  parentFeedId: 0,
  bookmarked: false,
  childFeedList: [
    {
      hashtagGenre: [],
      hashtagVibe: [],
      starring: 0,
      toonImage: "",
      toonName: "",
    },
  ],
  feedContexts: "",
  feedTitle: "",
  hashtags: [],
  writerMemberId: 0,
  writerMemberImage: "",
};
