import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Redirect from "@pages/Redirect";
import Login from "@pages/Login";
import Signup from "@routes/Signup";
import Mypage from "./pages/Mypage";
import HomePage from "@pages/HomePage";
import SearchPage from "@pages/SearchPage";
import CommonPage from "@pages/CommonPage";
import NewRecommend from "@routes/NewRecommend";
import NewChatRoom from "@routes/NewChatRoom";
import ChatRoomListFrame from "@components/home/chatroom/ChatRoomListFrame";
import ChatRoomMain from "@components/home/chatroom/main/ChatRoomMain";
import EditSeeWtnPage from "./pages/mypage/EditSeeWtnPage";
import EditLikedWtnPage from "./pages/mypage/EditLikedWtnPage";
import MyScrapPage from "./pages/mypage/MyScrapPage";
import MyFeedPage from "./pages/mypage/MyFeedPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login/kakao" element={<Redirect />} />
        <Route path="/signup/*" element={<Signup />} />

        <Route path="/home/*" element={<HomePage />} />

        <Route path="/chatroom/:id" element={<ChatRoomMain />} />
        <Route path="/chatroom/today" element={<ChatRoomListFrame types="today" />} />
        <Route path="/chatroom/rest" element={<ChatRoomListFrame types="rest" />} />

        <Route path="/chatroom/create/*" element={<NewChatRoom />} />
        <Route path="/search" element={<SearchPage />} />

        <Route path="/recommend/:id" element={<div>추천글 상세</div>} />
        <Route path="/recommend/new/*" element={<NewRecommend />} />

        <Route path="/mypage" element={<Mypage />} />
        <Route path="/modify/seeWebtoonList" element={<EditSeeWtnPage />} />
        <Route path="/modify/likedWebToonList" element={<EditLikedWtnPage />} />
        <Route path="/mypage/scrap" element={<MyScrapPage />} />
        <Route path="/mypage/feed" element={<MyFeedPage />} />
        <Route path="/profile/:userId" element={<div>상대방 프로필</div>} />
        <Route path="/common" element={<CommonPage />} />
        <Route path="*" element={<div>잘못된 경로</div>} />
      </Routes>
    </>
  );
}

export default App;
