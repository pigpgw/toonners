import Axios from "@api/JsonAxios";
import { Config } from "@/slices/useRecommendationStore";
const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const postNewRecommend = async (data: Config): Promise<unknown> => {
  try {
    const res = await Axios.post(`${BASE_URL}/feed/create`, data);
    return res.data.data;
  } catch (e) {
    console.log("추천글 등록 오류", e);
  }
};
