import React, { useEffect, useRef } from "react";
import Input from "../../components/common/Input/index";
import Header from "@/components/common/Header";
import styles from "@/styles/makeRecommend/makeRecommend.module.scss";
import AddButton from "@/components/newRecommend/Button";
import { useNavigate } from "react-router-dom";
import { useRecommendConfigStore, useRecommendationStore } from "@/slices/useRecommendationStore";
import WebtoonCard from "@/components/newRecommend/WebtoonCard";
import { postNewRecommend } from "@/api/recommend";
import Button from "@/components/common/Button";
import Text from "@/components/common/Text";

const Step1 = () => {
  const { recommendationData, setPostTitle, setPostcotexts, resetRecommendationData } = useRecommendationStore();
  const { resetRecommendConfig } = useRecommendConfigStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const clickShareBtn = async () => {
    if (recommendationData.title.length === 0) {
      alert("추천글 제목을 입력해주세요");
      return;
    }
    if (recommendationData.recommendToons.length === 0) {
      alert("웹툰 1가지 이상 추천해주세요");
      return;
    }
    try {
      await postNewRecommend(recommendationData);
      resetRecommendationData();
      resetRecommendConfig();
      alert("등록이 완료되었습니다.!");
      navigate("/home");
    } catch (e) {
      alert(e);
    }
  };

  const navigate = useNavigate();

  const goNextPage = () => {
    navigate("/recommend/new/2");
  };

  const goHome = () => {
    resetRecommendationData();
    resetRecommendConfig();
    navigate("/home");
  };

  const inputTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostTitle(e.target.value);
  };

  const inputContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostcotexts(e.target.value);
  };

  useEffect(() => {
    console.log(recommendationData);
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [recommendationData?.recommendToons?.length]);

  useEffect(() => {
    resetRecommendConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header
        title="웹툰 추천하기"
        before={goHome}
        button={
          <Button types="primary" sizes="small" onClick={clickShareBtn}>
            <Text types="button" bold="medium">
              공유
            </Text>
          </Button>
        }
      />
      <div className={styles.inputcontainer}>
        <Input
          types="default"
          placeholder="제목을 입력하세요"
          colors="gray-1"
          value={recommendationData.title}
          onChange={inputTitleChange}
        />
        <textarea
          value={recommendationData.cotexts}
          onChange={inputContentChange}
          className={styles.textarea}
          placeholder="내용을 입력하세요"
        />
        {recommendationData?.recommendToons?.map((item, index) => {
          return (
            <WebtoonCard
              key={index}
              title={item.title}
              score={item.starring}
              imgUrl={item.imageUrl}
              moodList={item.hashtagVibe}
              genreList={item.hashtagGenre}
            />
          );
        })}
        {recommendationData.recommendToons.length < 4 && <AddButton onClick={goNextPage} />}
        <div ref={scrollRef}></div>
      </div>
    </>
  );
};

export default Step1;
