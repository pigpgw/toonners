import { useNavigate } from "react-router-dom";
import Text from "@/components/common/Text";
import Button from "@components/common/Button/index";
import MainImg from "@assets/images/login/MainImg.svg?react";
import styles from "@styles/wrong/index.module.scss";

const WrongPath = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };
  return (
    <div className={styles.wrapper}>
      <Text types="display" bold="bold">
        잘못된 경로입니다.
      </Text>
      <hr /> <hr /> <hr /> <hr />
      <MainImg />
      <div className={styles.btnWrapper}>
        <Button onClick={goHome}>홈으로</Button>
      </div>
    </div>
  );
};

export default WrongPath;
