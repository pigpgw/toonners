import { Routes, Route } from "react-router";
import RecommendPage from "@pages/RecommendPage";
import ChatroomPage from "@pages/ChatroomPage";

const HomeRoutes = () => {
  return (
    <Routes>
      <Route index path="/" element={<ChatroomPage />} />
      <Route path="/recommend" element={<RecommendPage />} />
    </Routes>
  );
};

export default HomeRoutes;
