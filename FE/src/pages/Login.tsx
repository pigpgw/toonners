import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "@styles/login/LoginPage.module.scss";
import MainImg from "@assets/images/login/MainImg.svg?react";
import KakaoButton from "@components/common/Button/Kakao";
import Button from "@components/common/Button";

const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
const KAKAO_CLIENT_ID = "33391f8684ec1fcb9e918031bb236f4d";
const link = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const Login = () => {
  const navigate = useNavigate();

  const loginHandler = () => {
    window.location.href = link;
  };

  const goHome = () => {
    navigate("/home");
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) navigate("/home");
  }, []);

  return (
    // MainImg
    <div className={styles.mainContainer}>
      <MainImg />
      <div className={`${styles.btnContainer} ${styles.onAnimation}`}>
        <KakaoButton onClick={loginHandler} />
        <Button onClick={goHome} types="black">
          로그인 없이 둘러보기
        </Button>
      </div>
    </div>
  );
};

export default Login;
