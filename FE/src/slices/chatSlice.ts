import { create } from "zustand";
import { WebtoonConfig } from "@/interface/Webtoon.interface";
import { ChatRoomInfoConfig } from "@/interface/ChatRoom.interface";

interface State {
  selected: WebtoonConfig;
  chatroomInfo: ChatRoomInfoConfig;
}

interface Action {
  actions: {
    setSelected: (webtoon: WebtoonConfig) => void;
    setChatRoomInfo: (info: ChatRoomInfoConfig) => void;
  };
}

export const initialState = {
  selected: {
    title: "",
    url: "",
    imageUrl: "",
    updateDays: [],
    fanCount: 0,
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
    setSelected: (webtoon: WebtoonConfig) => set(() => ({ selected: webtoon })),
    setChatRoomInfo: (info: ChatRoomInfoConfig) => set(() => ({ chatroomInfo: info })),
  },
}));

export const useChatActions = () => useChatStore((state) => state.actions);
