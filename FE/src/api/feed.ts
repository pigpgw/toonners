import Axios from "@api/JsonAxios";
import { Config } from "@/slices/useRecommendationStore";

const HOST = import.meta.env.VITE_BASE_API_URL;
const getFeedList = async () => {
  const res = await Axios.get(HOST + "/feed/search/all/parent-feed");
  return res.data.data;
};

const getFeedItem = async (feedId: string) => {
  const res = await Axios.get(HOST + `/feed/search/detail/parent-feed?parent-feed-id=${feedId}`);
  return res.data.data;
};

const postBookMark = async (feedId: string) => {
  try {
    await Axios.post(HOST + `/bookmark/feed?feed-id=${feedId}`);
  } catch (e) {
    console.log("북마크 전송 실패");
  }
};

const getSearchFeed = async (keyword: string) => {
  const res = await Axios.get(HOST + `/feed/search/feed-list?part-of-title=${keyword}`);
  return res.data.data;
};

const getUserFeed = async (keyword: string) => {
  const res = await Axios.get(HOST + `/feed/search/parent-feed/member?member-id=${keyword}`);
  return res.data.data;
};

const putUserFeed = async (feedId: number, feed: Config) => {
  await Axios.put(HOST + `/feed/update/${feedId}`, feed);
};

const postFeedLike = async (feedId: number) => {
  try {
    await Axios.post(HOST + `/like/feed?feed-id=${feedId}`);
  } catch (e) {
    console.log("좋아요 실패");
  }
};

export { getFeedList, getFeedItem, postBookMark, getSearchFeed, getUserFeed, putUserFeed, postFeedLike };
