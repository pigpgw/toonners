import Text from "@/components/common/Text";
import styles from "@/styles/signup/Signup.module.scss";
import { useNavigate } from "react-router-dom";
import MainImg from "../../assets/images/login/main.png";

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
        <img src={MainImg} alt="" className={styles.mainImg} />
      </div>
      <button className={styles.confirm} onClick={nextStep}>
        확인
      </button>
    </>
  );
};

export default Signup3;
