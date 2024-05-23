import { Navigate, Route, Routes } from "react-router-dom";
import CreateChatRoom1 from "@components/home/chatroom/create/CreateChatRoom1";
import CreateChatRoom2 from "@components/home/chatroom/create/CreateChatRoom2";

const NewChatRoom = () => (
  <Routes>
    <Route path="/" element={<Navigate to="1" />} />
    <Route path="1" element={<CreateChatRoom1 />} />
    <Route path="2" element={<CreateChatRoom2 />} />
  </Routes>
);

export default NewChatRoom;
