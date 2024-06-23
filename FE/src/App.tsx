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
import OtherPage from "./pages/other/OtherPage";
import WrongPath from "./pages/WrongPath";
import { CHAT_ROOM_TYPES, FEED_SCRAP_TYPES, EDIT_MY_WEBTOON_TYPES } from "./constants/ComponentTypes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/kakao_callback" element={<Redirect />} />
        <Route path="/home/*" element={<HomePage />} />
        <Route path="/chatroom/today" element={<ChatRoomListFrame types={CHAT_ROOM_TYPES.TODAY} />} />
        <Route path="/chatroom/rest" element={<ChatRoomListFrame types={CHAT_ROOM_TYPES.REST} />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/recommend/:id" element={<FeedDetail />} />
        <Route path="*" element={<WrongPath />} />
        <Route path="/signup/*" element={<Signup />} />

        <Route element={<PrivateRoute />}>
          <Route path="/chatroom/:id" element={<ChatRoomMain />} />
          <Route path="/chatroom/create/*" element={<NewChatRoom />} />
          <Route path="/recommend/new/*" element={<NewRecommend />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypage/feed" element={<FeedScrapPanel type={FEED_SCRAP_TYPES.Feed} />} />
          <Route path="/mypage/scrap" element={<FeedScrapPanel type={FEED_SCRAP_TYPES.Scrap} />} />
          <Route path="/profile/:userId" element={<OtherPage />} />
          <Route path="/modify/likedWebToonList" element={<EditMyWebtoonFrame type={EDIT_MY_WEBTOON_TYPES.Like} />} />
          <Route path="/modify/seeWebtoonList" element={<EditMyWebtoonFrame type={EDIT_MY_WEBTOON_TYPES.See} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
