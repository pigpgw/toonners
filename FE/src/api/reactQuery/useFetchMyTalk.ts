import { useQuery } from "@tanstack/react-query";
import { getAllChatRoomList } from "../chat";

const useFetchMyChatList = () => {
  const {
    data: myChatListState,
    isLoading: myChatListLoading,
    isError: myChatListError,
  } = useQuery({
    queryKey: ["topChat"],
    queryFn: () => getAllChatRoomList(),
  });
  return { myChatListState, myChatListLoading, myChatListError };
};

export default useFetchMyChatList;
