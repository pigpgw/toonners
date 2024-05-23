import axios from "axios";

type Webtoon = {
  title: string;
  url: string;
  img: string;
  updateDays: string[];
  fanCount: number;
};

const fetchWetboonInfo = async (title: string): Promise<Webtoon[]> => {
  const response = await axios.get(`https://korea-webtoon-api.herokuapp.com/search?keyword=${title}`);
  const webttonData = response.data.webtoons || [];
  const filteredWebtoons = webttonData.map((webtoon: Webtoon) => ({
    title: webtoon.title,
    url: webtoon.url,
    img: webtoon.img,
    updateDays: webtoon.updateDays,
    fanCount: webtoon.fanCount,
  }));
  return filteredWebtoons;
};

export default fetchWetboonInfo;
