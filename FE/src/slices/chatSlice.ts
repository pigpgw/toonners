import { create } from "zustand";
import { ChatRoomInfoConfig } from "@/interface/ChatRoom.interface";

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

export const initialState: State = {
  selected: {
    title: "",
    siteUrl: "",
    imageUrl: "",
    days: [],
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
    setSelected: (webtoon: UserWebtoonListConfig) => set({ selected: webtoon }),
    setChatRoomInfo: (info: ChatRoomInfoConfig) => set({ chatroomInfo: info }),
  },
}));

export const useChatActions = () => useChatStore((state) => state.actions);

export interface WebtoonConfig {
  imageUrl: string;
  title: string;
  url: string;
  updateDays?: string[];
  fanCount?: string;
}

export interface WebtoonResponseConfig {
  title: string;
  url: string;
  thumbnail: string;
  updateDays: string[];
  fanCount?: string;
}

export interface UserWebtoonListConfig {
  title: string;
  rating: number;
  imageUrl: string;
  days: string[];
  siteUrl: string;
}

export interface UserConfig {
  nickname: string;
  email: string;
  image?: string | null;
  description: string;
  watchingToons: UserWebtoonListConfig[];
  favoriteToons: UserWebtoonListConfig[];
}
