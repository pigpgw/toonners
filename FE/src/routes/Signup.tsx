import { Navigate, Route, Routes } from "react-router-dom";
import Signup1 from "@/pages/Signup/Signup1";

const Signup = () => (
  <Routes>
    <Route path="/" element={<Navigate to="1" />} />
    <Route path="1" element={<Signup1 />} />
    <Route path="2" element={<div>사용자 등록2</div>} />
  </Routes>
);

export default Signup;
