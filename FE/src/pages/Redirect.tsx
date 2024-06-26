import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loding";
import { ERROR_MESSAGE } from "@/constants/ErrorTypes";

const HOST = import.meta.env.VITE_BASE_API_URL;
const Redirect = () => {
  const navigate = useNavigate();
  const code = new URL(document.location.toString()).searchParams.get("code");

  useEffect(() => {
    const postCode = async () => {
      try {
        const response = await axios.post(HOST + `/oauth2/callback/kakao`, code, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        if (response.status === 200) {
          //  토큰 로컬 스토리지에 세팅하고 페이지 라우팅
          const token = response.headers["authorization"];
          localStorage.setItem("accessToken", token.replace("BEARER ", ""));
          localStorage.setItem("userId", response.data.id); // 유저ID
          navigate("/signup/1");
        } else {
          throw new Error("서버 응답이 200이 아닙니다.");
        }
      } catch (e) {
        alert(ERROR_MESSAGE.LOGIN_ERROR);
        navigate("/");
      }
    };

    postCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ paddingTop: "15vh" }}>
      <Loading />
    </div>
  );
};

export default Redirect;
