import { Navigate, Route, Routes } from "react-router-dom";
import Signup1 from "@/pages/Signup/Signup1";
import Signup2 from "@/pages/Signup/Signup2";
import Signup3 from "@/pages/Signup/Signup3";

const Signup = () => (
  <Routes>
    <Route path="/" element={<Navigate to="1" />} />
    <Route path="1" element={<Signup1 />} />
    <Route path="2" element={<Signup2 />} />
    <Route path="3" element={<Signup3 />} />
  </Routes>
);

export default Signup;
