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
  img: string;
  updateDays: string[];
  fanCount?: string;
}

export interface UserWebtoonListConfig {
  title: string;
  rating: number;
  imageUrl: string;
  updateDays: string[];
  url: string;
}

export interface UserConfig {
  nickname: string;
  email: string;
  image?: string | null;
  description: string;
  watchingToons: UserWebtoonListConfig[];
  favoriteToons: UserWebtoonListConfig[];
}
