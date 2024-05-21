import { useNavigate } from "react-router-dom";
import styles from "@styles/login/LoginPage.module.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const clickLogin = () => {
    navigate("/home1");
  };
  return (
    <>
      <div>스플래쉬</div>
      <div className={styles.onAnimation}>
        <button onClick={clickLogin}>로그인</button>
        <button onClick={clickLogin}>둘러보기</button>
      </div>
    </>
  );
};
export default LoginPage;
