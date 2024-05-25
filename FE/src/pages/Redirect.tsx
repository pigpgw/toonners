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
          //  토큰 로컬 스토리지에 세팅하고 페이지 라우팅
          const token = response.headers["authorization"];
          localStorage.setItem("token", token.replace("BEARER ", ""));
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
