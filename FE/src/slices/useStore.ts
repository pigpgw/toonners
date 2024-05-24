import { WebtoonConfig } from "@/interface/Webtoon.interface";
import create from "zustand";

interface UserConfig {
  nickname: string;
  introduction: string;
  seeWebttonList: WebtoonConfig[];
  likedWebToonList: WebtoonConfig[];
}

interface UserStoreConfig {
  user: UserConfig;
//   setUser: (user: UserConfig) => void;
  setUserNickname: (nickname: string) => void;
  setIntroDuction: (introduction: string) => void;
  addSeeWebtoon: (webtoon: WebtoonConfig) => void;
  removeSeeWebtoon: (webtoon: WebtoonConfig) => void;
  addLikedWebToonList: (webtoon: WebtoonConfig) => void;
  removeLikedWebToonList: (webtoon: WebtoonConfig) => void;
}

export const useUserStore = create<UserStoreConfig>((set) => ({
  user: {
    nickname: "",
    introduction: "",
    seeWebttonList: [],
    likedWebToonList: [],
  },
//   setUser: (user) => set({ user }),

  setUserNickname: (nickname: string) =>
    set((state) => ({
      user: { ...state.user, nickname },
    })),

  setIntroDuction: (introduction: string) =>
    set((state) => ({
      user: { ...state.user, introduction },
    })),

  addSeeWebtoon: (webtoon: WebtoonConfig) =>
    set((state) => ({
      user: {
        ...state.user,
        seeWebttonList: [...state.user.seeWebttonList, webtoon],
      },
    })),

  removeSeeWebtoon: (removeWebtoon: WebtoonConfig) =>
    set((state) => ({
      user: { ...state.user, seeWebttonList: state.user.seeWebttonList.filter((webtoon) => webtoon !== removeWebtoon) },
    })),

  addLikedWebToonList: (webtoon: WebtoonConfig) =>
    set((state) => ({
      user: {
        ...state.user,
        likedWebToonList: [...state.user.likedWebToonList, webtoon],
      },
    })),

  removeLikedWebToonList: (removeWebtoon: WebtoonConfig) =>
    set((state) => ({
      user: {
        ...state.user,
        likedWebToonList: state.user.likedWebToonList.filter((webtoon) => webtoon !== removeWebtoon),
      },
    })),
}));
