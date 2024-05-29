import { UserConfig, UserWebtoonListConfig } from "@/interface/Webtoon.interface";
import { create } from "zustand";

interface UserStoreConfig {
  user: UserConfig;
  setUser: (user: UserConfig) => void;
  setUserNickname: (nickname: string) => void;
  setDescription: (description: string) => void;
  addSeeWebtoon: (webtoon: UserWebtoonListConfig) => void;
  removeSeeWebtoon: (webtoon: UserWebtoonListConfig) => void;
  addFavoriteToons: (webtoon: UserWebtoonListConfig) => void;
  removeFavoriteToons: (webtoon: UserWebtoonListConfig) => void;
  resetSeeWebtoon: () => void;
  resetFavoriteToons: () => void;
}

export const useUserStore = create<UserStoreConfig>((set) => ({
  user: {
    nickname: "",
    email: "",
    description: "",
    watchingToons: [],
    favoriteToons: [],
  },

  setUser: (user: UserConfig) =>
    set(() => ({
      user: user,
    })),

  setUserNickname: (nickname: string) =>
    set((state) => ({
      user: { ...state.user, nickname },
    })),

  setDescription: (description: string) =>
    set((state) => ({
      user: { ...state.user, description },
    })),

  addSeeWebtoon: (webtoon: UserWebtoonListConfig) =>
    set((state) => ({
      user: {
        ...state.user,
        watchingToons: [...state.user.watchingToons, webtoon],
      },
    })),

  removeSeeWebtoon: (removeWebtoon: UserWebtoonListConfig) =>
    set((state) => ({
      user: { ...state.user, watchingToons: state.user.watchingToons.filter((webtoon) => webtoon !== removeWebtoon) },
    })),

  addFavoriteToons: (webtoon: UserWebtoonListConfig) =>
    set((state) => ({
      user: {
        ...state.user,
        favoriteToons: [...state.user.favoriteToons, webtoon],
      },
    })),

  removeFavoriteToons: (removeWebtoon: UserWebtoonListConfig) =>
    set((state) => ({
      user: {
        ...state.user,
        favoriteToons: state.user.favoriteToons.filter((webtoon) => webtoon !== removeWebtoon),
      },
    })),

  resetSeeWebtoon: () =>
    set((state) => ({
      user: {
        ...state.user,
        watchingToons: [],
      },
    })),

  resetFavoriteToons: () =>
    set((state) => ({
      user: {
        ...state.user,
        favoriteToons: [],
      },
    })),
}));
