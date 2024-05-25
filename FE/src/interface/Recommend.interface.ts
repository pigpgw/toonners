export interface RecommendConfig {
  webtoonTitle?: string;
  imgUrl?: string;
  score?: number;
  genre?: string[];
  mood?: string[];
}

export interface RecommendationConfig {
  title: string;
  content: string;
  recommendationList: RecommendConfig[];
}

export interface RecommendationStoreConfig {
  recommendationData: RecommendationConfig;
  setPostTitle: (title: string) => void;
  setPostContent: (content: string) => void;
  addRecommendation: (recommendation: RecommendConfig) => void;
  removeRecommendation: (title: string) => void;
  clearRecommendations: () => void;
}

export interface RecommendConfigStore {
  recommendConfig: RecommendConfig;
  setRecommendConfig: (config: RecommendConfig) => void;
  setImgUrlAndTitle: (imgUrl: string, title: string) => void;
  resetRecommendConfig: () => void;
}
