import { useNavigate } from "react-router-dom";
import { updateUserData } from "@/api/myPage";
import { SUCCESS_MESSAGE } from "@/constants/SuccessTypes";
import { useUserStore } from "@/slices/useStore";
import Text from "@/components/common/Text";
import Complete from "@assets/images/login/Complete.svg?react";
import styles from "@/styles/signup/Signup.module.scss";

const Signup3 = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const nextStep = async () => {
    try {
      await updateUserData(user);
      navigate("/home");
      alert(SUCCESS_MESSAGE.SIGNUP_SUCCESS_ALERT);
    } catch (e) {
      console.log("error", e);
      navigate("/home");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Text types="headline" bold="bold">
          반가워요! {user.nickname}님
          <br />
          서비스명에 오신 걸 환영해요.
        </Text>
        <Complete />
      </div>
      <button className={styles.confirm} onClick={nextStep}>
        확인
      </button>
    </>
  );
};

export default Signup3;
