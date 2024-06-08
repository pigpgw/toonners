import { create } from "zustand";

export interface RecommendToonConfig {
  starring: number;
  hashtagGenre: string[];
  hashtagVibe: string[];
  title: string;
  imageUrl: string;
  imageSiteUrl: string;
  days?: string[];
}

export interface Config {
  parentFeedId: undefined | number;
  title: string;
  context: string;
  recommendToons: RecommendToonConfig[];
}

interface RecommendationStoreConfig {
  recommendationData: Config;
  setPostId: (parentFeedId: number) => void;
  setPostTitle: (title: string) => void;
  setPostcotexts: (context: string) => void;
  addRecommendation: (recommendation: RecommendToonConfig) => void;
  removeRecommendation: (title: string) => void;
  clearRecommendations: () => void;
  resetRecommendationData: () => void;
}

const initialState: Config = {
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

interface RecommendConfigStore {
  recommendConfig: RecommendToonConfig;
  setRecommendConfig: (config: Props) => void;
  setimageUrlAndTitle: (imageUrl: string, title: string, imageSiteUrl: string, days: string[]) => void;
  resetRecommendConfig: () => void;
}

interface Props {
  starring?: number;
  hashtagGenre?: string[];
  hashtagVibe?: string[];
}

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
  setRecommendConfig: (config: Props) =>
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
