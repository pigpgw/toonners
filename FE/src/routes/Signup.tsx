import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { getOnMyData } from "@/api/myPage";
import { ERROR_MESSAGE } from "@/constants/ErrorTypes";
import Signup1 from "@/pages/Signup/Signup1";
import Signup2 from "@/pages/Signup/Signup2";
import Signup3 from "@/pages/Signup/Signup3";

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
        alert(ERROR_MESSAGE.FETCH_MT_DATA_ERROR);
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