import SearchedWebtoonCard from "@/components/Webtoon/SearchedWebtoonCard";
import Header from "@/components/common/Header";
import styles from "@/styles/makeRecommend/makeRecommend.module.scss";
import Text from "../../components/common/Text/index";
import Tag from "@/components/common/Tag";
import { useNavigate } from "react-router-dom";
import { useRecommendConfigStore, useRecommendationStore } from "@/slices/useRecommendationStore";
import { useEffect, useState } from "react";
import Rating from "@/components/common/Rating";

const genres = ["공포", "로맨스", "판타지", "학원물"];
const moods = ["설레는", "신나는", "소름돋는", "잔잔한"];

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
  };

  useEffect(() => {
    setRecommendConfig({
      hashtagGenre: selectedGenres,
    });
  }, [selectedGenres, setRecommendConfig]);
  useEffect(() => {
    setRecommendConfig({
      hashtagVibe: selectedMoods,
    });
  }, [selectedMoods, setRecommendConfig]);
  useEffect(() => {
    setRecommendConfig({
      starring: rating,
    });
  }, [rating, setRecommendConfig]);

  const clickAddWebtoon = () => {
    if (recommendConfig.hashtagGenre.length === 0 || recommendConfig.hashtagVibe.length === 0) {
      console.log(recommendConfig);
      alert("최소 하나 이상의 장르와 분위기를 골라주세요");
      return;
    }

    addRecommendation(recommendConfig);
    navigate("/recommend/new/1");
  };

  const toggleGenreSelection = (label: string) => {
    console.log("분위기 고름", label, selectedMoods);
    setSelectedGenres((prev) => {
      if (prev.includes(label)) {
        return prev.filter((item) => item !== label);
      } else {
        return [...prev, label];
      }
    });
  };

  const toggleMoodSelection = (label: string) => {
    console.log("분위기 고름", label, selectedMoods);
    setSelectedMoods((prev) => {
      if (prev.includes(label)) {
        return prev.filter((item) => item !== label);
      } else {
        return [...prev, label];
      }
    });
  };

  return (
    <>
      <Header title="웹툰 추천하기" before beforeClick={clickOutBtn} />
      <div className={styles.container}>
        <div style={{ marginLeft: "85px" }}>
          <SearchedWebtoonCard title={recommendConfig.title} imgUrl={recommendConfig.imageUrl || ""} />
        </div>
        <hr className={styles.line} style={{ marginTop: "50px" }} />
        <Text types="title" bold="bold">
          별점 매기기
        </Text>
        <div className={styles.tagBox}>
          <Rating sizes="large" onChange={(_, value) => value && setRating(value)} />
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
