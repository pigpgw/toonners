import { useQuery } from "@tanstack/react-query";
import { getChatCommentList } from "../chat";

const useFetchChatMessages = (roomId: string) => {
  const {
    data: chatMessagesState,
    isLoading: chatMessagesLoading,
    isError: chatMessagesError,
    refetch: chatMessagesRefetch,
  } = useQuery({
    queryKey: ["chatMessages", roomId],
    queryFn: () => getChatCommentList(roomId),
  });
  return { chatMessagesState, chatMessagesLoading, chatMessagesError, chatMessagesRefetch };
};

export default useFetchChatMessages;
