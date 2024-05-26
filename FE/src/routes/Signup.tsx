import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Signup1 from "@/pages/Signup/Signup1";
import Signup2 from "@/pages/Signup/Signup2";
import Signup3 from "@/pages/Signup/Signup3";
import { getOnMyData } from "@/api/myPage";

const Signup = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const userData: unknown = await getOnMyData();
  //       console.log("사용자 데이터:", userData);
  //       if (userData.data.nickname.length !== 0) {
  //         navigate("/home");
  //       }
  //     } catch (error) {
  //       console.error("데이터를 가져오는 중 오류 발생:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
