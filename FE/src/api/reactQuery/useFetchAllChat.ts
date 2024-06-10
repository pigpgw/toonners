import { useQuery } from "@tanstack/react-query";
import { getAllChatRoomList } from "../chat";

const useFetchAllChatList = () => {
  const {
    data: allChatListState,
    isLoading: allChatListLoading,
    isError: allChatListError,
  } = useQuery({
    queryKey: ["topChat"],
    queryFn: () => getAllChatRoomList(),
    select: (data) => [...data].splice(Math.floor(Math.random() * [...data].length), 1)[0],
  });
  return { allChatListState, allChatListLoading, allChatListError };
};

export default useFetchAllChatList;
