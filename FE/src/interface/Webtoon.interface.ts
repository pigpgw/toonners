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
