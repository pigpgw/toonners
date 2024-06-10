import { useQuery } from "@tanstack/react-query";
import { getChatRoom } from "../chat";

const useFetchChatRoomInfo = (roomId: string) => {
  const {
    data: chatRoomInfoState,
    isLoading: chatRoomInfoLoading,
    isError: chatRoomInfoError,
  } = useQuery({
    queryKey: ["chatRoom", roomId],
    queryFn: () => getChatRoom(roomId),
    
  });
  return { chatRoomInfoState, chatRoomInfoLoading, chatRoomInfoError};
};

export default useFetchChatRoomInfo;
