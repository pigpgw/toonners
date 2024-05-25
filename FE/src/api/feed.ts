import Axios from "@api/JsonAxios";

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
  await Axios.post(HOST + `/bookmark/feed?feed-id=${feedId}`);
};

export { getFeedList, getFeedItem, postBookMark };
