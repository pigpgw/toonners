import { useQuery } from "@tanstack/react-query";
import { getRankingChatRoomList } from "../chat";

const useFetchTopChatList = () => {
  const {
    data: topChatListState,
    isLoading: topChatListLoading,
    isError: topChatListError,
  } = useQuery({
    queryKey: ["topChat"],
    queryFn: () => getRankingChatRoomList(),
    refetchInterval: 20000,
  });
  return { topChatListState, topChatListLoading, topChatListError };
};

export default useFetchTopChatList;
