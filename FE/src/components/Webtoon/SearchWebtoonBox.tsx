import React, { ChangeEvent } from "react";
import SearchedWebtoonCard from "./SearchedWebtoonCard";
import styles from "@/styles/webtoon/SearchWebtoonBox.module.scss";
import Input from "../common/Input";
import { WebtoonConfig } from "@/interface/Webtoon.interface";

interface Props {
  height: number;
  webtoonTitle: string;
  webToonList: WebtoonConfig[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (webtoon: WebtoonConfig) => void;
}

const SearchWebtoonBox: React.FC<Props> = ({ webtoonTitle, webToonList, onChange, handleSelect, height }) => {
  return (
    <div className={styles.searchBox} style={{ height: `${height}vh` }}>
      <div className={styles.searchInputBox}>
        <Input value={webtoonTitle} colors="gray-1" placeholder="검색어 입력" types="search" onChange={onChange} />
        <div className={styles.searchedWebtoonContainer}>
          {webToonList.map((webtoon, index) => (
            <SearchedWebtoonCard
              key={`${index}_li`}
              title={webtoon.title}
              imgUrl={webtoon.imageUrl}
              clicked={webtoon.clicked}
              onClick={() => handleSelect(webtoon)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchWebtoonBox;
