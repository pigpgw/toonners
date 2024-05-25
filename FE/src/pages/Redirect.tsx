import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const navigate = useNavigate();
  const code = new URL(document.location.toString()).searchParams.get("code");

  useEffect(() => {
    const postCode = async () => {
      try {
        const response = await axios.post(`http://localhost:8080/oauth2/callback/kakao`, code, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        if (response.status === 200) {
          console.log("토큰 확인", response.headers.authorization);
          if (response.headers.authorization) {
            const res = response.headers.authorization.trim().replace(/^Bearer\s+/i, "");
            localStorage.setItem("accessToken", res);
            console.log("토큰만 추출:", res);
          } else {
            console.log("Authorization 헤더가 존재하지 않습니다.");
          }

          navigate("/home");
        } else {
          throw new Error("서버 응답이 200이 아닙니다.");
        }
      } catch (e) {
        console.error(e);
        alert("로그인에 실패했습니다.");
        navigate("/");
      }
    };

    postCode();
  }, []);

  return <div>로딩중</div>;
};

export default Redirect;
