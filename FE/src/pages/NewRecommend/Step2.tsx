import Header from "@/components/common/Header";
import Input from "@/components/common/Input";
import styles from "@/styles/makeRecommend/makeRecommend.module.scss";
import { useState } from "react";
import Text from "@/components/common/Text";

const Step1 = () => {
  const [search, setSearch] = useState("");
  const clickBtn = () => {
    console.log("나가기 버튼 누름");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <Header title="웹툰 추천하기" before={clickBtn} buttonName="공유" />
      <div className={styles.inputcontainer}>
        <Text types="sub-header" bold="bold">
          어떤 웹툰에 대해 이야기할까요?
        </Text>
        <Input placeholder="플레이스 홀더" colors="gray-1" types="search" value={search} onChange={onChange} />
      </div>
    </>
  );
};

export default Step1;
