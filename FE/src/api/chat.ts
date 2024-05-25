
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

