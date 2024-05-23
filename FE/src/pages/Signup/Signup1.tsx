import Text from "@/components/common/Text";
import styles from "@/styles/signup/Signup.module.scss";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import InputWithButton from "@/components/common/InputWithButton";

const Signup1 = () => {
  const [nickname, setNickname] = useState<string>("");
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const nextStep = () => {
    try {
      // 서버에 전송 중복확인
      navigate("/signup/2");
    } catch (e) {
      alert("이미 존재하는 닉네임 입니다.!");
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
        color="gray-1"
      />
    </div>
  );
};

export default Signup1;
