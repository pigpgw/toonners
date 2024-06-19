import { WebtoonResponseConfig, UserWebtoonListConfig } from "@/interface/Webtoon.interface";
import axios from "axios";

const fetchWebtoonInfo = async (title: string): Promise<UserWebtoonListConfig[]> => {
  const response = await axios.get(`https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons?keyword=${title}`);
  const webtoonData = response.data.webtoons || [];
  const invalidPattern = /[;[\],]/;
  const filteredWebtoons = webtoonData
    .filter((webtoon: WebtoonResponseConfig) => !invalidPattern.test(webtoon.title))
    .map((webtoon: WebtoonResponseConfig) => ({
      title: webtoon.title,
      url: webtoon.url,
      imageUrl: webtoon.thumbnail[0],
      updateDays: webtoon.updateDays,
      rating: webtoon.fanCount,
    }));

  return filteredWebtoons;
};

export default fetchWebtoonInfo;
