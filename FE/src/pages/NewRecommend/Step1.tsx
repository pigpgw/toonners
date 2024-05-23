import React, { useState } from "react";
import Input from "../../components/common/Input/index";
import Header from "@/components/common/Header";
import styles from "@/styles/makeRecommend/makeRecommend.module.scss";
import Text from "../../components/common/Text/index";
import WebtoonPlusBtn from "@/components/Webtoon/plusBtn";

const Step1 = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const clickBtn = () => {
    console.log("나가기 버튼 누름");
  };

  const inputTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const inputContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <>
      <Header title="웹툰 추천하기" before={clickBtn} buttonName="공유" button={true} />
      <div className={styles.inputcontainer}>
        <Input placeholder="제목을 입력하세요" colors="gray-1" value={title} onChange={inputTitleChange} />
        <textarea
          value={content}
          onChange={inputContentChange}
          className={styles.textarea}
          placeholder="내용을 입력하세요"
        />
        <hr className={styles.line} />
        <div className={styles.btnContainer}>
          <Text types="sub-header" bold="bold">
            웹툰 추가하기
          </Text>
          <WebtoonPlusBtn onClick={clickBtn} />
        </div>
      </div>
    </>
  );
};

export default Step1;
