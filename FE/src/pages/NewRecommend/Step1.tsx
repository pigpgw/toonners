import React, { useState } from "react";
import Input from "../../components/common/Input/index";
import Header from "@/components/common/Header";
import styles from "@/styles/makeRecommend/makeRecommend.module.scss";
import AddButton from "@/components/newRecommend/Button";
import { useNavigate } from "react-router-dom";

const Step1 = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const clickOutBtn = () => {
    console.log("나가기 버튼 누름");
  };

  const navigate = useNavigate();

  const goNextPage = () => {
    navigate("/recommend/new/2");
  };

  const inputTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const inputContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <>
      <Header title="웹툰 추천하기" before={clickOutBtn} buttonName="공유" button={true} />
      <div className={styles.inputcontainer}>
        <Input placeholder="제목을 입력하세요" colors="gray-1" value={title} onChange={inputTitleChange} />
        <textarea
          value={content}
          onChange={inputContentChange}
          className={styles.textarea}
          placeholder="내용을 입력하세요"
        />
        <AddButton onClick={goNextPage} />
      </div>
    </>
  );
};

export default Step1;
