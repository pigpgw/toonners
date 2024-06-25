export interface RecommendToonConfig {
  starring: number;
  hashtagGenre: string[];
  hashtagVibe: string[];
  title: string;
  imageUrl: string;
  imageSiteUrl: string;
  days?: string[];
}

export interface RecommendationDataConfig {
  parentFeedId?: number;
  title: string;
  context: string;
  recommendToons: RecommendToonConfig[];
}

export interface RecommendationStoreConfig {
  recommendationData: RecommendationDataConfig;
  setPostId: (parentFeedId: number) => void;
  setPostTitle: (title: string) => void;
  setPostcotexts: (context: string) => void;
  addRecommendation: (recommendation: RecommendToonConfig) => void;
  removeRecommendation: (title: string) => void;
  clearRecommendations: () => void;
  resetRecommendationData: () => void;
}

export interface RecommendConfigStoreProps {
  starring?: number;
  hashtagGenre?: string[];
  hashtagVibe?: string[];
}

export interface RecommendConfigStore {
  recommendConfig: RecommendToonConfig;
  setRecommendConfig: (config: RecommendConfigStoreProps) => void;
  setimageUrlAndTitle: (imageUrl: string, title: string, imageSiteUrl: string, days: string[]) => void;
  resetRecommendConfig: () => void;
}
