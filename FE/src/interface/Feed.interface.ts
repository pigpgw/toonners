export interface FeedListConfig {
  parentFeedId: number;
  bookmarked: boolean;

  childFeedList: [
    {
      hashtagGenre: string[];
      hashtagVibe: string[];
      starring: number;
      toonImage: string;
      toonName: string;
    },
  ];
  feedContexts: string;
  feedTitle: string;
  hashtags: string[];
  writerMemberId: number;
  writerMemberImage: string;
}
