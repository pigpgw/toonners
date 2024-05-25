import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Redirect from "@pages/Redirect";
import Login from "@pages/Login";
import Signup from "@routes/Signup";
import HomePage from "@pages/HomePage";
import SearchPage from "@pages/SearchPage";
import CommonPage from "@pages/CommonPage";
import NewRecommend from "@routes/NewRecommend";
import NewChatRoom from "@routes/NewChatRoom";
import ChatRoomListFrame from "@components/home/chatroom/ChatRoomListFrame";
import ChatRoomMain from "@components/home/chatroom/main/ChatRoomMain";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/kakao_callback" element={<Redirect />} />
        <Route path="/signup/*" element={<Signup />} />

        <Route path="/home/*" element={<HomePage />} />

        <Route path="/chatroom/:id" element={<ChatRoomMain />} />
        <Route path="/chatroom/today" element={<ChatRoomListFrame types="today" />} />
        <Route path="/chatroom/rest" element={<ChatRoomListFrame types="rest" />} />

        <Route path="/chatroom/create/*" element={<NewChatRoom />} />
        <Route path="/search" element={<SearchPage />} />

        <Route path="/recommend/:id" element={<div>추천글 상세</div>} />
        <Route path="/recommend/new/*" element={<NewRecommend />} />

        <Route path="/mypage" element={<div>마이페이지</div>} />
        <Route path="/profile/:userId" element={<div>상대방 프로필</div>} />
        <Route path="/common" element={<CommonPage />} />
        <Route path="*" element={<div>잘못된 경로</div>} />
      </Routes>
    </>
  );
}

export default App;
