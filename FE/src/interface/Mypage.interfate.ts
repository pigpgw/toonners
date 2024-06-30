export interface WatchingToonCofing {
  title: string;
  imageUrl: string;
  siteUrl: string;
  rating: number;
  days: string[];
}

export interface UserData {
  nickname?: string;
  description?: string;
  watchingToons?: WatchingToonCofing[];
  favoriteToons?: WatchingToonCofing[];
}

export interface UserNicknameConfig {
  nickname: string;
}
