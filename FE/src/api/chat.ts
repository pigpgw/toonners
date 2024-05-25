import Axios from "@api/JsonAxios";

const HOST = import.meta.env.VITE_BASE_API_URL;
const getAllChatRoomList = async () => {
  const res = await Axios.get(HOST + "/chatroom/search/all");
  return res.data.data;
};

const getTodayChatRoomList = async () => {
  const res = await Axios.get(HOST + "/chatroom/search/updated-day");
  return res.data.data;
};

const postChatRoom = async (data: {
  toonName: string;
  toonImage: string;
  toonUrl: string;
  fanCounts: number;
  updateDay: string[];
  contexts: string;
}) => {
  const res = await Axios.post(HOST + "/chatroom/create", data);
  return res.data.data;
};

const getChatCommentList = async (roomId: string) => {
  const res = await Axios.get(HOST + `/chat/search/chatroom?chatroom-id=${roomId}`);
  return res.data.data;
};

const postChatComment = async (data: { chatRoomId: string; contexts: string }) => {
  const res = await Axios.post(HOST + "/chat/create", data);
  return res;
};

export { getAllChatRoomList, getTodayChatRoomList, postChatRoom, getChatCommentList, postChatComment };
