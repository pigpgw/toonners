import Axios from "@api/JsonAxios";

const getAllChatRoomList = async () => {
  const res = await Axios.get("http://localhost:8080/chatroom/search/all");
  return res.data.data;
};

const getTodayChatRoomList = async () => {
  const res = await Axios.get("http://localhost:8080/chatroom/search/updated-day");
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
  const res = await Axios.post("http://localhost:8080/chatroom/create", data);
  return res.data.data;
};

export { getAllChatRoomList, getTodayChatRoomList, postChatRoom };
