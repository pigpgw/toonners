import { ChatRoomInfoConfig } from "@/interface/ChatRoom.interface";
import Axios from "@api/JsonAxios";

const HOST = import.meta.env.VITE_BASE_API_URL;
const getAllChatRoomList = async (): Promise<ChatRoomInfoConfig[]> => {
  const res = await Axios.get(HOST + "/chatroom/search/all");
  return res.data.data;
};

const getTodayChatRoomList = async (): Promise<ChatRoomInfoConfig[]> => {
  const res = await Axios.get(HOST + "/chatroom/search/updated-day");
  return res.data.data;
};

const getRankingChatRoomList = async () => {
  const res = await Axios.get(HOST + "/chatroom/search/top3");
  return res.data.data;
};

const getChatRoom = async (roomId: string) => {
  const res = await Axios.get(HOST + `/chatroom/search/detail/${roomId}`);
  return res.data.data;
};

const postChatRoom = async (data: {
  toonName: string;
  toonImage: string;
  toonUrl: string;
  fanCounts: number | undefined;
  updateDay: string[] | undefined;
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
  return res.data.data;
};

const getSearchChatRoom = async (keyword: string) => {
  const res = await Axios.get(HOST + `/chatroom/search/chatroom-list?part-of-name=${keyword}`);
  return res.data.data;
};

const getIsExist = async (title: string) => {
  const res = await Axios.get(HOST + `/chatroom/check-chatroom/${title}`);
  return res.data.data;
};

const postFireComment = async (roomId: string) => {
  const res = await Axios.post(HOST + `/fire/on`, { chatRoomId: roomId });
  return res.data.data;
};

const getMyTalk =  async ():Promise<ChatRoomInfoConfig[]>  => {
  const res = await Axios.get(`${HOST}/chatroom/search/participating-in`);
  return res.data.data;
};

const getOtherTalk = async (userId: string) => {
  const res = await Axios.get(`${HOST}/chatroom/search/participating-in/member?member-id=${userId}`);
  return res.data.data;
};

export {
  getAllChatRoomList,
  getTodayChatRoomList,
  getChatRoom,
  postChatRoom,
  getChatCommentList,
  postChatComment,
  getSearchChatRoom,
  getRankingChatRoomList,
  getIsExist,
  postFireComment,
  getMyTalk,
  getOtherTalk,
};
