export interface WebtoonConfig {
  imageUrl: string;
  title: string;
  url: string;
  updateDays?: string[];
  fanCount?: number;
  clicked?: boolean;
}

export interface WebtoonResponseConfig {
  title: string;
  url: string;
  img: string;
  updateDays: string[];
  fanCount?: string;
  clicked?: boolean;
}

export interface UserWebtoonListConfig {
  title: string;
  imageUrl: string;
  siteUrl: string;
  rating?: string;
  days: string[] | null;
}
