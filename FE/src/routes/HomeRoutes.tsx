import { Routes, Route } from "react-router";
import FeedPage from "@pages/FeedPage";
import ChatroomPage from "@pages/ChatroomPage";

const HomeRoutes = () => {
  return (
    <Routes>
      <Route index path="/" element={<ChatroomPage />} />
      <Route path="/recommend" element={<FeedPage />} />
    </Routes>
  );
};

export default HomeRoutes;

