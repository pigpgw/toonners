import { useQuery } from "@tanstack/react-query";
import {
  getAllChatRoomList,
  getChatCommentList,
  getChatRoom,
  getRankingChatRoomList,
  getTodayChatRoomList,
} from "../chat";

export const useFetchAllChatList = () => {
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

export const useFetchChatMessages = (roomId: string) => {
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

export const useFetchChatRoomInfo = (roomId: string) => {
  const {
    data: chatRoomInfoState,
    isLoading: chatRoomInfoLoading,
    isError: chatRoomInfoError,
  } = useQuery({
    queryKey: ["chatRoom", roomId],
    queryFn: () => getChatRoom(roomId),
  });
  return { chatRoomInfoState, chatRoomInfoLoading, chatRoomInfoError };
};

export const useFetchMyChatList = () => {
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

export const useFetchTodayChatList = () => {
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

export const useFetchTopChatList = () => {
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
