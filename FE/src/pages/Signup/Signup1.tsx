import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ERROR_MESSAGE } from "@/constants/ErrorTypes";
import { useUserStore } from "../../slices/useStore";
import Text from "@/components/common/Text";
import InputWithButton from "@/components/common/InputWithButton";
import styles from "@/styles/signup/Signup.module.scss";
import { filterNickname } from "@/utils/filterValue";

const Signup1 = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");
  const { setUserNickname } = useUserStore();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const nextStep = () => {
    try {
      if (filterNickname(nickname)) {
        setUserNickname(nickname);
      } else {
        alert(ERROR_MESSAGE.INVALID_NICKNAME);
        return;
      }
      setUserNickname(nickname);
      navigate("/signup/2");
    } catch (e) {
      alert(ERROR_MESSAGE.EXISTING_NICKNAME);
    }
  };

  return (
    <div className={styles.container}>
      <Text types="headline" bold="bold">
        반가워요!
        <br />
        서비스명에 오신 걸 환영해요.
      </Text>
      <br />
      <p className={styles.subTitle}>내 닉네임을 만들어 볼까요?</p>
      <InputWithButton
        inputText={nickname}
        btnName="확인"
        inputChange={onChange}
        onSubmit={nextStep}
        placeHolder="닉네임을 입력해주세요"
        colors="gray-1"
        types="default"
      />
    </div>
  );
};

export default Signup1;
