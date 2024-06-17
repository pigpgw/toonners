import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ERROR_MESSAGE } from "@/constants/ErrorTypes";
import { GENRES, MOODS } from "@/constants/Tags";
import { useRecommendConfigStore, useRecommendationStore } from "@/slices/useRecommendationStore";
import Tag from "@/components/common/Tag";
import Text from "../../components/common/Text/index";
import Header from "@/components/common/Header";
import Rating from "@/components/common/Rating";
import SearchedWebtoonCard from "@/components/Webtoon/SearchedWebtoonCard";
import styles from "@/styles/makeRecommend/makeRecommend.module.scss";

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
      alert(ERROR_MESSAGE.SELECT_GENRE_AND_MOOD_MESSAGE);
      return;
    }

    addRecommendation(recommendConfig);
    navigate("/recommend/new/1");
  };

  const toggleGenreSelection = (label: string) => {
    setSelectedGenres((prev) => {
      if (prev.includes(label)) {
        return prev.filter((item) => item !== label);
      } else {
        return [...prev, label];
      }
    });
  };

  const toggleMoodSelection = (label: string) => {
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
          {GENRES.map((genre) => (
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
          {MOODS.map((mood) => (
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
