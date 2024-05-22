import { Navigate, Route, Routes } from "react-router-dom";

const Signup = () => (
  <Routes>
    <Route path="/" element={<Navigate to="1" />} />
    <Route path="1" element={<div>사용자 등록1</div>} />
    <Route path="2" element={<div>사용자 등록2</div>} />
    <Route path="3" element={<div>사용자 등록3</div>} />
    <Route path="4" element={<div>사용자 등록4</div>} />
  </Routes>
);

export default Signup;
