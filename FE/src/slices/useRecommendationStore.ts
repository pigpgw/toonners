import { create } from "zustand";

interface RecommendToonConfig {
  starring: number;
  hashtagGenre: string[];
  hashtagVibe: string[];
  title: string;
  imageUrl: string;
  imageSiteUrl: string;
  days: string[];
}

interface Config {
  title: string;
  cotexts: string;
  recommendToons: RecommendToonConfig[];
}

interface RecommendationStoreConfig {
  recommendationData: Config;
  setPostTitle: (title: string) => void;
  setPostcotexts: (cotexts: string) => void;
  addRecommendation: (recommendation: RecommendToonConfig) => void;
  removeRecommendation: (title: string) => void;
  clearRecommendations: () => void;
  resetRecommendationData: () => void;
}

const initialState: Config = {
  title: "",
  cotexts: "",
  recommendToons: [],
};

export const useRecommendationStore = create<RecommendationStoreConfig>((set) => ({
  recommendationData: initialState,
  setPostTitle: (title: string) =>
    set((state) => ({
      recommendationData: { ...state.recommendationData, title },
    })),
  setPostcotexts: (cotexts: string) =>
    set((state) => ({
      recommendationData: { ...state.recommendationData, cotexts },
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
  setRecommendConfig: (config: Config) => void;
  setimageUrlAndTitle: (imageUrl: string, title: string, imageSiteUrl: string, days: string[]) => void;
  resetRecommendConfig: () => void;
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
  setRecommendConfig: (config: Config) =>
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
