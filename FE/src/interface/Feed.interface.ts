export interface FeedListConfig {
  parentFeedId: number;
  bookmarked: boolean;

  childFeedList: ChildFeedListConfig[];
  feedContexts: string;
  feedTitle: string;
  hashtags: string[];
  writerMemberId: number;
  writerMemberImage: string;
}

export interface ChildFeedListConfig {
  hashtagGenre: string[];
  hashtagVibe: string[];
  starring: number;
  toonImage: string;
  toonName: string;
}
