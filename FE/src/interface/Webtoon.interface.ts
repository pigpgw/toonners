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
