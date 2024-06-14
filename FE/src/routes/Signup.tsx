import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Signup1 from "@/pages/Signup/Signup1";
import Signup2 from "@/pages/Signup/Signup2";
import Signup3 from "@/pages/Signup/Signup3";
import { useEffect } from "react";
import { getOnMyData } from "@/api/myPage";

const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getOnMyData();
        if (res.nickname && res.watchingToons.length) {
          navigate("/home");
        }
      } catch (e) {
        alert("유저 정보 가져오기 실패");
        navigate("/home");
      }
    };
    fetchUser();
  }, [navigate]);
  return (
    <Routes>
      <Route path="/" element={<Navigate to="1" />} />
      <Route path="1" element={<Signup1 />} />
      <Route path="2" element={<Signup2 />} />
      <Route path="3" element={<Signup3 />} />
    </Routes>
  );
};

export default Signup;
