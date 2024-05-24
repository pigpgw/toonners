import SearchedWebtoonCard from "./SearchedWebtoonCard";
import styles from "@/styles/webtoon/SearchWebtoonBox.module.scss";
import Input from "../common/Input";
import { WebtoonConfig } from "@/interface/Webtoon.interface";
import { ChangeEvent } from "react";

interface Props {
  height: number;
  webtoonTitle: string | undefined;
  webToonList: WebtoonConfig[] | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (webtoon: WebtoonConfig) => void;
}

const SearchWebtoonBox = ({ webtoonTitle, webToonList, onChange, handleSelect, height }: Props) => {
  return (
    <div className={styles.searchBox} style={{ height: `${height}px` }}>
      <div className={styles.searchInputBox}>
        <Input value={webtoonTitle} colors="gray-1" placeholder="검색어 입력" types="search" onChange={onChange} />
        <div className={styles.searchedWebtoonContainer}>
          {webToonList?.map((webtoon, index) => (
            <SearchedWebtoonCard
              key={`${index}_li`}
              title={webtoon.title}
              imgUrl={webtoon.img}
              clicked={false}
              onClick={() => handleSelect(webtoon)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchWebtoonBox;
