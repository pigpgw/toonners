import SearchedWebtoonCard from "@/components/Webtoon/SearchedWebtoonCard";
import Header from "@/components/common/Header";
import styles from "@/styles/makeRecommend/makeRecommend.module.scss";
import Text from "../../components/common/Text/index";
import Tag from "@/components/common/Tag";
import { useNavigate } from "react-router-dom";
import Rating from "@/components/common/Rating";
import { useRecommendConfigStore, useRecommendationStore } from "@/slices/useRecommendationStore";
import { useState } from "react";

const Step3 = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const { recommendConfig, setRecommendConfig, resetRecommendConfig } = useRecommendConfigStore();
  const { addRecommendation } = useRecommendationStore();

  const navigate = useNavigate();
  const clickOutBtn = () => {
    navigate("/recommend/new/1");
    resetRecommendConfig();
    console.log("나가기 버튼 누름");
  };

  const clickAddWebtoon = () => {
    addRecommendation(recommendConfig);
    navigate("/recommend/new/1");
  };

  const genres = ["공포", "로맨스", "판타지", "학원물"];
  const moods = ["설레는", "신나는", "소름돋는", "잔잔한"];

  const toggleGenreSelection = (label: string) => {
    if (selectedGenres.length >= 3 && !selectedGenres.includes(label)) {
      alert("장르는 최대 3개까지 선택 가능합니다.");
      return;
    }

    setSelectedGenres((prev: string[]) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label],
    );

    storeData();
  };

  const toggleMoodSelection = (label: string) => {
    if (selectedMoods.length >= 3 && !selectedMoods.includes(label)) {
      alert("분위기는 최대 3개까지 선택 가능합니다.");
      return;
    }

    setSelectedMoods((prev: string[]) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label],
    );
    storeData();
  };

  const storeData = () => {
    const config = {
      score: rating,
      genre: selectedGenres,
      mood: selectedMoods,
    };
    setRecommendConfig(config);
  };

  return (
    <>
      <Header title="웹툰 추천하기" before={clickOutBtn} buttonName="공유" />
      <div className={styles.container}>
        <div style={{ marginLeft: "85px" }}>
          <SearchedWebtoonCard title={recommendConfig.webtoonTitle} imgUrl={recommendConfig.imgUrl || ""} />
        </div>
        <hr className={styles.line} style={{ marginTop: "50px" }} />
        <Text types="title" bold="bold">
          별점 매기기
        </Text>
        <div className={styles.tagBox}>
          <Rating sizes="large" onChange={(_, value) => setRating(value)} />
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
              onClick={() => {
                toggleGenreSelection(genre);
              }}
              clickable={selectedGenres.includes(genre)}
              checked
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
              onClick={() => {
                toggleMoodSelection(mood);
              }}
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
