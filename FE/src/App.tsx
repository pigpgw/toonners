import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Redirect from "@pages/Redirect";
import Login from "@pages/Login";
import Signup from "@routes/Signup";
import Mypage from "./pages/Mypage";
import HomePage from "@pages/HomePage";
import SearchPage from "@pages/SearchPage";
import NewRecommend from "@routes/NewRecommend";
import NewChatRoom from "@routes/NewChatRoom";
import ChatRoomListFrame from "@components/home/chatroom/ChatRoomListFrame";
import ChatRoomMain from "@components/home/chatroom/main/ChatRoomMain";
import EditMyWebtoonFrame from "./pages/mypage/EditMyWebtoonFrame";
import FeedScrapPanel from "./pages/mypage/FeedScrapPanel";
import FeedDetail from "./components/home/feed/FeedDetail";
import { PrivateRoute } from "./routes/PrivateRoutes";
import { OtherPage } from "./pages/OtherPage/OtherPage";
import WrongPath from "./pages/WrongPath";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/kakao_callback" element={<Redirect />} />
        <Route path="/home/*" element={<HomePage />} />
        <Route path="/chatroom/today" element={<ChatRoomListFrame types="today" />} />
        <Route path="/chatroom/rest" element={<ChatRoomListFrame types="rest" />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/recommend/:id" element={<FeedDetail />} />
        <Route path="*" element={<WrongPath />} />
        <Route path="/signup/*" element={<Signup />} />

        <Route element={<PrivateRoute />}>
          <Route path="/chatroom/:id" element={<ChatRoomMain />} />
          <Route path="/chatroom/create/*" element={<NewChatRoom />} />
          <Route path="/recommend/new/*" element={<NewRecommend />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypage/feed" element={<FeedScrapPanel type="feed" />} />
          <Route path="/mypage/scrap" element={<FeedScrapPanel type="scrap" />} />
          <Route path="/profile/:userId" element={<OtherPage />} />
          <Route path="/modify/likedWebToonList" element={<EditMyWebtoonFrame type="liked" />} />
          <Route path="/modify/seeWebtoonList" element={<EditMyWebtoonFrame type="see" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
