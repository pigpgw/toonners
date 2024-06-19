import Axios from "@api/JsonAxios";
import { Config } from "@/slices/useRecommendationStore";
const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const postNewRecommend = async (data: Config): Promise<unknown> => {
  const res = await Axios.post(`${BASE_URL}/feed/create`, data);
  return res.data.data;
};
