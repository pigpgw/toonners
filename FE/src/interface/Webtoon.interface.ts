export interface WebtoonConfig {
  title: string;
  url: string;
  img: string;
  updateDays: string[];
  fanCount: number;
}

export interface WebttonInterface extends WebtoonConfig {
  clicked?: boolean;
}
