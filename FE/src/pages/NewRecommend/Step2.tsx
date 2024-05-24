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
  // const [select, setSelect] = useState<WebtoonConfig>();

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

  const clickNextBtn = () => {
    navigate("/recommend/new/3");
    console.log(webtoons);
  };

  const selectWebtoon = (webtoon: WebtoonConfig) => {
    const resetClickedWebtoons = webtoons.map((item) => ({
      ...item,
      clicked: false,
    }));

    const updatedWebtoons = resetClickedWebtoons.map((item) =>
      item.title === webtoon.title ? { ...item, clicked: true } : item,
    );
    console.log(updatedWebtoons)
    setWebtoons(updatedWebtoons);
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
      <button className={styles.confirm} onClick={clickNextBtn}>
        확인
      </button>
    </>
  );
};

export default Step1;
