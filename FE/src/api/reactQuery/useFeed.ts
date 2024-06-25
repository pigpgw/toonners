import { useQuery } from "@tanstack/react-query";
import { getFeedItem, getFeedList } from "../feed";
import { FeedListConfig } from "@/interface/Feed.interface";

export const useFeedQuery = () => {
  const {
    data: feedListState,
    isLoading: feedListLoading,
    isError: feedListError,
  } = useQuery<FeedListConfig[]>({
    queryKey: ["feedList"],
    queryFn: () => getFeedList(),
    select: (data) => [...data].reverse(),
  });

  return { feedListState, feedListLoading, feedListError };
};

export const useFetchFeedLikes = (feedId: string) => {
  const {
    data: feedLikesState,
    isLoading: feedLkesLoading,
    isError: feedLikesError,
    refetch: feedLikesRefetch,
  } = useQuery({
    queryKey: ["likes", feedId],
    queryFn: () => getFeedItem(feedId),
    select: (data) => data.likeCount,
  });

  return { feedLikesState, feedLikesError, feedLkesLoading, feedLikesRefetch };
};
