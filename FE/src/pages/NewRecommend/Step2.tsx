import Header from "@/components/common/Header";
import styles from "@/styles/makeRecommend/makeRecommend.module.scss";
import { useEffect, useState } from "react";
import Text from "@/components/common/Text";
import SearchWebtoonBox from "@/components/Webtoon/SearchWebtoonBox";
import { WebtoonConfig } from "@/interface/Webtoon.interface";
import fetchWetboonInfo from "@/api/fetchWetboonInfo";
import { useNavigate } from "react-router-dom";

const Step1 = () => {
  const [search, setSearch] = useState<string>("");
  const [webtoons, setWebtoons] = useState<WebtoonConfig[]>([]);
  const [select, setSelect] = useState<WebtoonConfig>();

  useEffect(() => {
    const fetchWebtoons = async () => {
      try {
        const response = await fetchWetboonInfo(search);
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
    if (search) fetchWebtoons();
    else setWebtoons([]);
  }, [search]);

  const clickOutBtn = () => {
    console.log("나가기 버튼 누름");
  };

  const navigate = useNavigate();

  const selectWebtoon = (webtoon: WebtoonConfig) => {
    setSelect(webtoon);
    console.log("고른 웹툰", select);
    navigate("/recommend/new/3");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Header title="웹툰 추천하기" before={clickOutBtn} buttonName="공유" />
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
        height={670}
      />
    </>
  );
};

export default Step1;
