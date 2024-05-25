import React, { useEffect, useRef } from "react";
import Input from "../../components/common/Input/index";
import Header from "@/components/common/Header";
import styles from "@/styles/makeRecommend/makeRecommend.module.scss";
import AddButton from "@/components/newRecommend/Button";
import { useNavigate } from "react-router-dom";
import { useRecommendConfigStore, useRecommendationStore } from "@/slices/useRecommendationStore";
import WebtoonCard from "@/components/newRecommend/WebtoonCard";

const Step1 = () => {
  const { recommendationData, setPostTitle, setPostContent, clearRecommendations } = useRecommendationStore();
  const { resetRecommendConfig } = useRecommendConfigStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const clickShareBtn = () => {
    console.log("나가기 버튼 누름");
    if (recommendationData.title.length === 0) {
      alert("추천글 제목을 입력해주세요");
      return;
    }
    clearRecommendations();
    resetRecommendConfig();
    alert('등록이 완료되었습니다.!')
    navigate("/home");
    
  };

  const navigate = useNavigate();

  const goNextPage = () => {
    navigate("/recommend/new/2");
  };

  const inputTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostTitle(e.target.value);
  };

  const inputContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  useEffect(() => {
    console.log(recommendationData);
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [recommendationData?.recommendationList?.length]);

  useEffect(() => {
    resetRecommendConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header title="웹툰 추천하기" before={clickShareBtn} buttonName="공유" button={true} onClick={clickShareBtn} />
      <div className={styles.inputcontainer}>
        <Input
          types="default"
          placeholder="제목을 입력하세요"
          colors="gray-1"
          value={recommendationData.title}
          onChange={inputTitleChange}
        />
        <textarea
          value={recommendationData.content}
          onChange={inputContentChange}
          className={styles.textarea}
          placeholder="내용을 입력하세요"
        />
        {recommendationData?.recommendationList?.map((item, index) => {
          return (
            <WebtoonCard
              key={index}
              title={item.webtoonTitle}
              score={item.score}
              imgUrl={item.imgUrl}
              moodList={item.mood}
              genreList={item.genre}
            />
          );
        })}
        {recommendationData.recommendationList.length < 4 && <AddButton onClick={goNextPage} />}
        <div ref={scrollRef}></div>
      </div>
    </>
  );
};

export default Step1;
