import { useQuery } from "@tanstack/react-query";
import { getFeedList } from "../feed";

const useFeedQuery = () => {
  const {
    data: feedListState,
    isLoading: feedListLoading,
    isError: feedListError,
  } = useQuery({
    queryKey: ["feedList"],
    queryFn: () => getFeedList(),
    select: (data) => [...data].reverse()
  });

  return { feedListState, feedListLoading, feedListError };
};

export default useFeedQuery;
