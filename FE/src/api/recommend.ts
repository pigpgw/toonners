import Axios from "@api/JsonAxios";
const BASE_URL = import.meta.env.VITE_BASE_API_URL;

type RecommendToonConfig = {
  starring: number;
  hashtagGenre: string[];
  hashtagVibe: string[];
  title: string;
  imageUrl: string;
  imageSiteUrl: string;
  days: string[];
};

type Config = {
  title: string;
  cotexts: string;
  recommendToons: RecommendToonConfig[];
};

export const postNewRecommend = async (data: Config): Promise<unknown> => {
  try {
    const res = await Axios.post(`${BASE_URL}/feed/create`, data);
    console.log(res.data);
    return res.data.data;
  } catch (e) {
    console.log("추천글 등록 오류", e);
  }
};
