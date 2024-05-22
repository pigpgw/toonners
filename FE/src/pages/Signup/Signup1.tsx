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
        반가워요! xxx님
        <br />
        어떤 웹툰을 보고있나요?
      </Text>
      <br />
      <Text types="title" bold="bold">
        내 닉네임을 만들어 볼까요?
      </Text>
      <InputWithButton inputText={nickname} btnName="확인" inputChange={onChange} onSubmit={nextStep}/>
    </div>
  );
};

export default Signup1;
