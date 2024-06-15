import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserWebtoonListConfig } from "@/interface/Webtoon.interface";
import fetchWetboonInfo from "@/api/fetchWetboonInfo";
import { useRecommendConfigStore, useRecommendationStore } from "@/slices/useRecommendationStore";
import Text from "@/components/common/Text";
import Header from "@/components/common/Header";
import SearchWebtoonBox from "@/components/Webtoon/SearchWebtoonBox";
import styles from "@/styles/makeRecommend/makeRecommend.module.scss";

const Step2 = () => {
  const [search, setSearch] = useState<string>("");
  const [query, setQuery] = useState("");
  const [webtoons, setWebtoons] = useState<UserWebtoonListConfig[]>([]);
  const { recommendationData } = useRecommendationStore();
  const { setimageUrlAndTitle } = useRecommendConfigStore();

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQuery(search);
    }, 300);
    return () => clearTimeout(debounce);
  }, [search]);

  useEffect(() => {
    const fetchWebtoons = async () => {
      try {
        const response = await fetchWetboonInfo(query);
        setWebtoons(
          response.map((item) => ({
            ...item,
            clicked: false,
          })),
        );
      } catch (e) {
        console.error("오류 발생", e);
      }
    };
    if (query) fetchWebtoons();
    else setWebtoons([]);
  }, [query]);

  const clickOutBtn = () => {
    navigate("/recommend/new/1");
  };

  const navigate = useNavigate();

  const selectWebtoon = (webtoon: UserWebtoonListConfig) => {
    if (recommendationData.recommendToons.filter((item) => item.title === webtoon.title).length !== 0) {
      alert("이미 추천한 웹툰입니다.");
      return;
    }
    if (webtoon.title && webtoon.imageUrl) {
      // setSelect(webtoon);
      setimageUrlAndTitle(webtoon.imageUrl, webtoon.title, webtoon.url, webtoon.updateDays ? webtoon.updateDays : []);
      navigate("/recommend/new/3");
    } else {
      console.error("웹툰의 title 또는 img가 정의되지 않았습니다.");
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Header title="웹툰 추천하기" before beforeClick={clickOutBtn} />
      <div className={styles.inputcontainer}>
        <Text types="sub-header" bold="bold">
          어떤 웹툰에 대해 이야기할까요?
        </Text>
      </div>
      <SearchWebtoonBox
        webtoonTitle={search}
        onChange={onChange}
        webToonList={webtoons}
        handleSelect={selectWebtoon}
        height={75}
      />
    </>
  );
};

export default Step2;
