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
  });

  return { feedListState, feedListLoading, feedListError };
};

export default useFeedQuery;
