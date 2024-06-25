export interface WatchingToonCofing {
  title: string;
  image_url: string;
  site_url: string;
  rating: number;
  days: string[];
}

export interface UserData {
  nickname?: string;
  description?: string;
  watching_toons?: WatchingToonCofing[];
  favorite_toons?: WatchingToonCofing[];
}

export interface UserNicknameConfig {
  nickname: string;
}
