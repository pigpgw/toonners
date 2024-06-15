import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainImg from "@assets/images/login/MainImg.svg?react";
import KakaoButton from "@components/common/Button/Kakao";
import styles from "@styles/login/LoginPage.module.scss";

const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const link = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const Login = () => {
  const navigate = useNavigate();

  const loginHandler = () => {
    window.location.href = link;
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) navigate("/home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.mainContainer}>
      <MainImg />
      <div className={`${styles.btnContainer} ${styles.onAnimation}`}>
        <KakaoButton onClick={loginHandler} />
      </div>
    </div>
  );
};

export default Login;
