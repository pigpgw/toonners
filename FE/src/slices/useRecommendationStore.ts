import create from "zustand";

interface RecommendConfig {
  webtoonTitle?: string;
  imgUrl?: string;
  score?: number;
  genre?: string[];
  mood?: string[];
}

interface RecommendationConfig {
  title: string;
  content: string;
  recommendationList: RecommendConfig[];
}

interface RecommendationStoreConfig {
  recommendationData: RecommendationConfig;
  setPostTitle: (title: string) => void;
  setPostContent: (content: string) => void;
  addRecommendation: (recommendation: RecommendConfig) => void;
  removeRecommendation: (title: string) => void;
  clearRecommendations: () => void;
}

export const useRecommendationStore = create<RecommendationStoreConfig>((set) => ({
  recommendationData: {
    title: "",
    content: "",
    recommendationList: [],
  },
  setPostTitle: (title: string) =>
    set((state) => ({
      recommendationData: { ...state.recommendationData, title },
    })),
  setPostContent: (content: string) =>
    set((state) => ({
      recommendationData: { ...state.recommendationData, content },
    })),
  addRecommendation: (recommendation: RecommendConfig) =>
    set((state) => ({
      recommendationData: {
        ...state.recommendationData,
        recommendationList: [...state.recommendationData.recommendationList, recommendation],
      },
    })),
  removeRecommendation: (title: string) =>
    set((state) => ({
      recommendationData: {
        ...state.recommendationData,
        recommendationList: state.recommendationData.recommendationList.filter((r) => r.webtoonTitle !== title),
      },
    })),
  clearRecommendations: () =>
    set((state) => ({
      recommendationData: {
        ...state.recommendationData,
        recommendationList: [],
      },
    })),
}));

interface RecommendConfigStore {
  recommendConfig: RecommendConfig;
  setRecommendConfig: (config: RecommendConfig) => void;
  setImgUrlAndTitle: (imgUrl: string, title: string) => void;
  resetRecommendConfig: () => void;
}

export const useRecommendConfigStore = create<RecommendConfigStore>((set) => ({
  recommendConfig: {
    webtoonTitle: "",
    imgUrl: "",
    score: 0,
    genre: [],
    mood: [],
  },
  setImgUrlAndTitle: (imgUrl: string, title: string) =>
    set((state) => ({
      recommendConfig: { ...state.recommendConfig, imgUrl, webtoonTitle: title },
    })),
  setRecommendConfig: (config: RecommendConfig) =>
    set((state) => ({
      recommendConfig: { ...state.recommendConfig, ...config },
    })),
  resetRecommendConfig: () =>
    set({
      recommendConfig: {
        webtoonTitle: "",
        imgUrl: "",
        score: 0,
        genre: [],
        mood: [],
      },
    }),
}));
