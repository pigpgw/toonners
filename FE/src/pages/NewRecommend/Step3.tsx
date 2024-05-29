import SearchedWebtoonCard from "@/components/Webtoon/SearchedWebtoonCard";
import Header from "@/components/common/Header";
import styles from "@/styles/makeRecommend/makeRecommend.module.scss";
import Text from "../../components/common/Text/index";
import Tag from "@/components/common/Tag";
import { useNavigate } from "react-router-dom";
// import Rating from "@/components/common/Rating";
import Button from "@/components/common/Button";
import { useRecommendConfigStore, useRecommendationStore } from "@/slices/useRecommendationStore";
import { useState } from "react";

const Step3 = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  // const [setRating] = useState<number>(0);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const { recommendConfig, resetRecommendConfig } = useRecommendConfigStore();
  const { addRecommendation } = useRecommendationStore();

  const navigate = useNavigate();

  const clickOutBtn = () => {
    navigate("/recommend/new/1");
    resetRecommendConfig();
  };

  const clickAddWebtoon = () => {
    if (recommendConfig.hashtagGenre.length === 0 && recommendConfig.hashtagVibe.length === 0) {
      alert("최소 하나 이상의 장르와 분위기를 골라주세요");
      return;
    }

    addRecommendation(recommendConfig);
    navigate("/recommend/new/1");
  };

  const genres = ["공포", "로맨스", "판타지", "학원물"];
  const moods = ["설레는", "신나는", "소름돋는", "잔잔한"];

  const toggleGenreSelection = (label: string) => {
    setSelectedGenres((prev) => {
      if (prev.includes(label)) {
        return prev.filter((item) => item !== label);
      } else if (prev.length < 3) {
        return [...prev, label];
      } else {
        alert("장르는 최대 3개까지 선택 가능합니다.");
        return prev;
      }
    });
  };

  const toggleMoodSelection = (label: string) => {
    setSelectedMoods((prev) => {
      if (prev.includes(label)) {
        return prev.filter((item) => item !== label);
      } else if (prev.length < 3) {
        return [...prev, label];
      } else {
        alert("분위기는 최대 3개까지 선택 가능합니다.");
        return prev;
      }
    });
  };

  return (
    <>
      <Header
        title="웹툰 추천하기"
        before
        beforeClick={clickOutBtn}
        button={
          <Button types="primary" sizes="small">
            <Text types="button" bold="medium">
              공유
            </Text>
          </Button>
        }
      />
      <div className={styles.container}>
        <div style={{ marginLeft: "85px" }}>
          <SearchedWebtoonCard title={recommendConfig.title} imgUrl={recommendConfig.imageUrl || ""} />
        </div>
        <hr className={styles.line} style={{ marginTop: "50px" }} />
        <Text types="title" bold="bold">
          별점 매기기
        </Text>
        <div className={styles.tagBox}>
          {/* <Rating sizes="large" onChange={(_, value) => value && setRating(value)} /> */}
        </div>
        <hr className={styles.line} />
        <Text types="title" bold="bold">
          장르
        </Text>
        <div className={styles.tagBox}>
          {genres.map((genre) => (
            <Tag
              key={genre}
              sizes="medium"
              label={`# ${genre}`}
              onClick={() => toggleGenreSelection(genre)}
              clickable={selectedGenres.includes(genre)}
              checked={selectedGenres.includes(genre)}
            />
          ))}
        </div>
        <hr className={styles.line} />
        <Text types="title" bold="bold">
          분위기
        </Text>
        <div className={styles.tagBox}>
          {moods.map((mood) => (
            <Tag
              key={mood}
              sizes="medium"
              label={`# ${mood}`}
              onClick={() => toggleMoodSelection(mood)}
              clickable={selectedMoods.includes(mood)}
              checked={selectedMoods.includes(mood)}
            />
          ))}
        </div>
      </div>
      <button className={styles.confirm} onClick={clickAddWebtoon}>
        추가하기
      </button>
    </>
  );
};

export default Step3;
