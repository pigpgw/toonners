import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserWebtoonListConfig } from "@/interface/Webtoon.interface";
import useDebounce from "@/hooks/useDebounce";
import fetchWetboonInfo from "@/api/fetchWetboonInfo";
import { useRecommendConfigStore, useRecommendationStore } from "@/slices/useRecommendationStore";
import Text from "@/components/common/Text";
import Header from "@/components/common/Header";
import SearchWebtoonBox from "@/components/Webtoon/SearchWebtoonBox";
import { ERROR_MESSAGE } from "@/constants/ErrorTypes";
import styles from "@/styles/makeRecommend/makeRecommend.module.scss";

const Step2 = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const debounced = useDebounce(search, 200);
  const [webtoons, setWebtoons] = useState<UserWebtoonListConfig[]>([]);
  const { recommendationData } = useRecommendationStore();
  const { setimageUrlAndTitle } = useRecommendConfigStore();

  useEffect(() => {
    const fetchWebtoons = async () => {
      try {
        const response = await fetchWetboonInfo(debounced);
        setWebtoons(
          response.map((item) => ({
            ...item,
            clicked: false,
          })),
        );
      } catch (e) {
        alert(ERROR_MESSAGE.FETCH_WEBTOON_ERROR);
        navigate("/");
      }
    };
    if (debounced) fetchWebtoons();
    else setWebtoons([]);
  }, [navigate, debounced]);

  const clickOutBtn = () => {
    navigate("/recommend/new/1");
  };

  const selectWebtoon = (webtoon: UserWebtoonListConfig) => {
    if (recommendationData.recommendToons.filter((item) => item.title === webtoon.title).length !== 0) {
      alert(ERROR_MESSAGE.ALREADY_RECOMMENDED);
      return;
    }
    if (webtoon.title && webtoon.imageUrl) {
      setimageUrlAndTitle(webtoon.imageUrl, webtoon.title, webtoon.url, webtoon.updateDays ? webtoon.updateDays : []);
      navigate("/recommend/new/3");
    } else {
      console.error(ERROR_MESSAGE.TITLE_OR_IMAGE_UNDEFINED);
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
