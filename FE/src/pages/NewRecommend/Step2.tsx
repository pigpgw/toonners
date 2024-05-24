import Header from "@/components/common/Header";
import styles from "@/styles/makeRecommend/makeRecommend.module.scss";
import { useEffect, useState } from "react";
import Text from "@/components/common/Text";
import SearchWebtoonBox from "@/components/Webtoon/SearchWebtoonBox";
import { WebtoonConfig } from "@/interface/Webtoon.interface";
import fetchWetboonInfo from "@/api/fetchWetboonInfo";

const Step1 = () => {
  const [search, setSearch] = useState<string>("");
  const [webtoons, setWebtoons] = useState<WebtoonConfig[]>([]);
  const [select, setSelect] = useState<WebtoonConfig>();

  useEffect(() => {
    const fetchWebtoons = async () => {
      try {
        const response = await fetchWetboonInfo(search);
        setWebtoons(response);
      } catch (e) {
        console.error("오류 발생", e);
      }
    };
    if (search) fetchWebtoons();
    else setWebtoons([]);
  }, [search]);

  const clickBtn = () => {
    console.log("나가기 버튼 누름");
  };

  const selectWebtoon = (webtoon: WebtoonConfig) => {
    setSelect(webtoon);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Header title="웹툰 추천하기" before={clickBtn} buttonName="공유" />
      <div className={styles.inputcontainer}>
        <Text types="sub-header" bold="bold">
          어떤 웹툰에 대해 이야기할까요?
        </Text>
        {/* <Input placeholder="플레이스 홀더" colors="gray-1" types="search" value={search} onChange={onChange} /> */}
      </div>
      <SearchWebtoonBox webtoonTitle={search} onChange={onChange} webToonList={webtoons} handleSelect={selectWebtoon} height={670}/>
    </>
  );
};

export default Step1;
