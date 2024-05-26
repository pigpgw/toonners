import { Navigate, Route, Routes } from "react-router-dom";
import Step1 from "@/pages/NewRecommend/Step1";
import Step2 from "@/pages/NewRecommend/Step2";
import Step3 from "@/pages/NewRecommend/Step3";

const NewRecommend = () => (
  <Routes>
    <Route path="/" element={<Navigate to="1" />} />
    <Route path="1" element={<Step1 />} />
    <Route path="2" element={<Step2 />} />
    <Route path="3" element={<Step3 />} />
  </Routes>
);

export default NewRecommend;
