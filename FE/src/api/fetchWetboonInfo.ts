import { WebtoonConfig, WebtoonResponseConfig } from "@/interface/Webtoon.interface";
import axios from "axios";

const fetchWetboonInfo = async (title: string): Promise<WebtoonConfig> => {
  const response = await axios.get(`https://korea-webtoon-api.herokuapp.com/search?keyword=${title}`);
  const webttonData = response.data.webtoons || [];
  const filteredWebtoons = webttonData.map((webtoon: WebtoonResponseConfig) => ({
    title: webtoon.title,
    url: webtoon.url,
    imageUrl: webtoon.img,
    updateDays: webtoon.updateDays,
    fanCount: webtoon.fanCount,
  }));
  return filteredWebtoons;
};

export default fetchWetboonInfo;
