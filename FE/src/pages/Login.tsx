import KakaoButton from "@/components/login/KakaoButton";
import Button from "@/components/login/Button";
import styles from "@/styles/login/Login.module.scss";

const Login = () => {
  return (
    <div className={styles.btnContainer}>
      <KakaoButton />
      <Button types="none">로그인 없이 둘러보기</Button>
    </div>
  );
};

export default Login;
