import { create } from "zustand";
import { ChatRoomInfoConfig } from "@/interface/ChatRoom.interface";

interface UserWebtoonListConfig {
  title: string;
  rating: number;
  imageUrl: string;
  updateDays: string[];
  url: string;
}

interface State {
  selected: UserWebtoonListConfig;
  chatroomInfo: ChatRoomInfoConfig;
}

interface Action {
  actions: {
    setSelected: (webtoon: UserWebtoonListConfig) => void;
    setChatRoomInfo: (info: ChatRoomInfoConfig) => void;
  };
}

export const initialState = {
  selected: {
    title: "",
    url: "",
    imageUrl: "",
    updateDays: [],
    rating: 0,
  },
  chatroomInfo: {
    chatRoomId: 0,
    toonName: "",
    toonImageUrl: "",
    toonSiteUrl: "",
    contexts: "",
    rating: 0,
    fireTotalCount: 0,
  },
};

export const useChatStore = create<State & Action>((set) => ({
  ...initialState,
  actions: {
    setSelected: (webtoon: UserWebtoonListConfig) => set(() => ({ selected: webtoon })),
    setChatRoomInfo: (info: ChatRoomInfoConfig) => set(() => ({ chatroomInfo: info })),
  },
}));

export const useChatActions = () => useChatStore((state) => state.actions);
