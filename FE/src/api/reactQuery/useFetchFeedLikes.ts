import { getFeedItem } from "../feed";
import { useQuery } from "@tanstack/react-query";

const useFetchFeedLikes = (feedId: string) => {
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

export default useFetchFeedLikes;
