import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Login from "@pages/Login";
import HomePage from "@pages/HomePage";
import CommonPage from "@pages/CommonPage";
import NewRecomand from "@routes/NewRecomand";
import NewChatRoom from "@routes/NewChatRoom";
import Signup from "@routes/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup/*" element={<Signup />} />

        <Route path="/home/*" element={<HomePage />} />

        <Route path="/chatroom/:id" element={<div>단톡방 상세</div>} />
        <Route path="/chatroomlist" element={<div>단톡방 리스트</div>} />

        <Route path="/chatroom/new/*" element={<NewChatRoom />} />
        <Route path="/chatroom/search" element={<div>단톡방 검색</div>} />

        <Route path="/recommend/:id" element={<div>추천글 상세</div>} />
        <Route path="/recommend/new/*" element={<NewRecomand />} />

        <Route path="/mypage" element={<div>마이페이지</div>} />
        <Route path="/profile/:userId" element={<div>상대방 프로필</div>} />
        <Route path="/common" element={<CommonPage />} />
        <Route path="*" element={<div>잘못된 경로</div>} />
      </Routes>
    </>
  );
}

export default App;
