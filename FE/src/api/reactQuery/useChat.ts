import { useQuery } from "@tanstack/react-query";
import {
  getAllChatRoomList,
  getChatCommentList,
  getChatRoom,
  getMyTalk,
  getRankingChatRoomList,
  getTodayChatRoomList,
} from "../chat";
import { ChatRoomInfoConfig, RankChatRoomInfoConfig } from "@/interface/ChatRoom.interface";

export const useFetchAllChatList = () => {
  const {
    data: allChatListState,
    isLoading: allChatListLoading,
    isError: allChatListError,
  } = useQuery<ChatRoomInfoConfig[]>({
    queryKey: ["allChat"],
    queryFn: () => getAllChatRoomList(),
    select: (data) => [...data].splice(Math.floor(Math.random() * [...data].length), 3),
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
  } = useQuery<ChatRoomInfoConfig>({
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
  } = useQuery<ChatRoomInfoConfig[]>({
    queryKey: ["myChat"],
    queryFn: () => getMyTalk(),
  });
  return { myChatListState, myChatListLoading, myChatListError };
};

export const useFetchTodayChatList = () => {
  const {
    data: todayChatListState,
    isLoading: todayChatListLoading,
    isError: todayChatListError,
  } = useQuery<ChatRoomInfoConfig[]>({
    queryKey: ["todayChat"],
    queryFn: () => getTodayChatRoomList(),
  });

  return { todayChatListState, todayChatListLoading, todayChatListError };
};

export const useFetchTopChatList = () => {
  const {
    data: topChatListState,
    isLoading: topChatListLoading,
    isError: topChatListError,
  } = useQuery<RankChatRoomInfoConfig[]>({
    
    queryKey: ["topChat"],
    queryFn: () => getRankingChatRoomList(),
    refetchInterval: 20000,
  });
  return { topChatListState, topChatListLoading, topChatListError };
};
