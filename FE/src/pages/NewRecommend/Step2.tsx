import Header from "@/components/common/Header";
import Input from "@/components/common/Input";
import styles from "@/styles/makeRecommend/makeRecommend.module.scss";
import { useState } from "react";
import Text from "@/components/common/Text";
import SearchedWebtoonCard from "@/components/Webtoon/SearchedWebtoonCard";

const Step1 = () => {
  const [search, setSearch] = useState("");
  const clickBtn = () => {
    console.log("나가기 버튼 누름");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <Header title="웹툰 추천하기" before={clickBtn} buttonName="공유" />
      <div className={styles.inputcontainer}>
        <Text types="sub-header" bold="bold">어떤 웹툰에 대해 이야기할까요?</Text>
        <Input placeholder="플레이스 홀더" colors="gray-1" types="search" value={search} onChange={onChange} />
      </div>
      <div className={styles.searchBox}>
        <div className={styles.searchInputBox}>
          <Input value={search} placeholder="검색어 입력" types="search" onChange={onChange} />
          <div className={styles.searchedWebtoonContainer}>
            {webtoons?.map((webtoon, index) => (
              <SearchedWebtoonCard
                key={`${index}_li`}
                title={webtoon.title}
                imgUrl={webtoon.img}
                clicked={false}
                onClick={() => {
                  handleSelect(webtoon);
                }}
              ></SearchedWebtoonCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Step1;
