import Button from "@/components/login/Button";
import styles from "@/styles/login/LoginPage.module.scss";
import { useNavigate } from "react-router-dom";
import MainImg from "../assets/images/login/main.png";
import KakaoImg from "../assets/images/login/KakaoImg.png";

const Login = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home/chatroom");
  };
  return (
    // MainImg
    <div className={styles.mainContainer}>
      <img src={MainImg} alt="" className={styles.mainImg} />
      <div className={`${styles.btnContainer} ${styles.onAnimation}`}>
        <KakaoButton />
        <Button onClick={goHome} types="none">
          로그인 없이 둘러보기
        </Button>
      </div>
    </div>
  );
};

export default Login;

const KakaoButton = ({ ...rest }) => {
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const KAKAO_CLIENT_ID = 'b53d2404d55238fab9d1509ecd3afe2d';  
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };
  return (
    <Button {...rest} onClick={loginHandler}>
      <img style={{ padding: "0" }} src={KakaoImg} alt="Kakao" />
    </Button>
  );
};
