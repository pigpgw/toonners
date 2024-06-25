import { create } from "zustand";
import {
  RecommendConfigStore,
  RecommendConfigStoreProps,
  RecommendToonConfig,
  RecommendationDataConfig,
  RecommendationStoreConfig,
} from "@/interface/Recommend.interface";

const initialState: RecommendationDataConfig = {
  parentFeedId: undefined,
  title: "",
  context: "",
  recommendToons: [],
};

export const useRecommendationStore = create<RecommendationStoreConfig>((set) => ({
  recommendationData: initialState,
  setPostId: (parentFeedId: number) =>
    set((state) => ({
      recommendationData: { ...state.recommendationData, parentFeedId },
    })),
  setPostTitle: (title: string) =>
    set((state) => ({
      recommendationData: { ...state.recommendationData, title },
    })),
  setPostcotexts: (context: string) =>
    set((state) => ({
      recommendationData: { ...state.recommendationData, context },
    })),
  addRecommendation: (recommendation: RecommendToonConfig) =>
    set((state) => ({
      recommendationData: {
        ...state.recommendationData,
        recommendToons: [...state.recommendationData.recommendToons, recommendation],
      },
    })),
  removeRecommendation: (title: string) =>
    set((state) => ({
      recommendationData: {
        ...state.recommendationData,
        recommendToons: state.recommendationData.recommendToons.filter((r) => r.title !== title),
      },
    })),
  clearRecommendations: () =>
    set((state) => ({
      recommendationData: {
        ...state.recommendationData,
        recommendToons: [],
      },
    })),
  resetRecommendationData: () =>
    set({
      recommendationData: initialState,
    }),
}));

export const useRecommendConfigStore = create<RecommendConfigStore>((set) => ({
  recommendConfig: {
    title: "",
    imageUrl: "",
    imageSiteUrl: "",
    days: [],
    starring: 0,
    hashtagGenre: [],
    hashtagVibe: [],
  },
  setimageUrlAndTitle: (imageUrl: string, title: string, imageSiteUrl: string, days: string[]) =>
    set((state) => ({
      recommendConfig: { ...state.recommendConfig, imageUrl, title, imageSiteUrl, days },
    })),
  setRecommendConfig: (config: RecommendConfigStoreProps) =>
    set((state) => ({
      recommendConfig: { ...state.recommendConfig, ...config },
    })),
  resetRecommendConfig: () =>
    set({
      recommendConfig: {
        title: "",
        imageUrl: "",
        imageSiteUrl: "",
        days: [],
        starring: 0,
        hashtagGenre: [],
        hashtagVibe: [],
      },
    }),
}));
