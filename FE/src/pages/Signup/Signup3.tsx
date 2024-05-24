import { useNavigate } from "react-router-dom";
import styles from "@/styles/signup/Signup.module.scss";
import Text from "@/components/common/Text";
import MainImg from "@assets/images/login/MainImg.svg?react";

const Signup3 = () => {
  const navigate = useNavigate();

  const nextStep = () => {
    try {
      // 서버에 유저 프로필 등록
      navigate("/home");
    } catch (e) {
      alert("등록에 실패하였습니다!");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Text types="headline" bold="bold">
          반가워요! 000님
          <br />
          서비스명에 오신 걸 환영해요.
        </Text>
        <MainImg />
      </div>
      <button className={styles.confirm} onClick={nextStep}>
        확인
      </button>
    </>
  );
};

export default Signup3;
