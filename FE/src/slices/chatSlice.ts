import { WebtoonConfig } from "@/interface/Webtoon.interface";
import { create } from "zustand";

interface State {
  selected: WebtoonConfig;
}

interface Action {
  actions: {
    setSelected: (webtoon: WebtoonConfig) => void;
  };
}

export const initialState = {
  selected: {
    title: "",
    url: "",
    img: "",
    updateDays: [],
    fanCount: 0,
  },
};

export const useChatStore = create<State & Action>((set) => ({
  ...initialState,
  actions: {
    setSelected: (webtoon: WebtoonConfig) => {
      console.log(webtoon);
      set(() => ({ selected: webtoon }));
    },
  },
}));

export const useChatActions = () => useChatStore((state) => state.actions);
