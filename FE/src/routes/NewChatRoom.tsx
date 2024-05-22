import { Navigate, Route, Routes } from "react-router-dom";

const NewChatRoom = () => (
  <Routes>
    <Route path="/" element={<Navigate to="1" />} />
    <Route path="1" element={<div>단톡방 새로만들기 단계 1입니다.</div>} />
    <Route path="2" element={<div>단톡방 새로만들기 단계 2입니다.</div>} />
    <Route path="3" element={<div>단톡방 새로만들기 단계 3입니다.</div>} />
  </Routes>
);

export default NewChatRoom;
