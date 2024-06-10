import { useQuery } from "@tanstack/react-query";
import { getTodayChatRoomList } from "../chat";

const useFetchTodayChatList = () => {
  const {
    data: todayChatListState,
    isLoading: todayChatListLoading,
    isError: todayChatListError,
  } = useQuery({
    queryKey: ["topChat"],
    queryFn: () => getTodayChatRoomList(),
  });

  return { todayChatListState, todayChatListLoading, todayChatListError };
};

export default useFetchTodayChatList;
