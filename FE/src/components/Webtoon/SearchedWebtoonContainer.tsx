import styles from "../../styles/webtoon/SelectedWebtoonContiner.module.scss";
import SearchedWebtoonCard from "@/components/Webtoon/SearchedWebtoonCard";
import WebtoonPlusBtn from "./plusBtn";

type Webtoon = {
  title: string;
  url: string;
  img: string;
  updateDays: string[];
  fanCount: number;
};

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lastSelectedWebtoonRef?: any;
  selectedList: Webtoon[];
  removeSelect: (webtoon: Webtoon) => void;
}

const SearchedWebtoonContainer = ({ selectedList, removeSelect, lastSelectedWebtoonRef }: Props) => {
  return (
    <div className={styles.SearchedWebtoonContainer}>
      {selectedList.map((webtoon, index) => (
        <div key={`${index}_li`} ref={index === selectedList.length - 1 ? lastSelectedWebtoonRef : null}>
          <SearchedWebtoonCard
            title={webtoon.title}
            imgUrl={webtoon.img}
            clicked={true}
            onClick={() => removeSelect(webtoon)}
          />
        </div>
      ))}
      {selectedList.length < 3 ? <WebtoonPlusBtn /> : null}
    </div>
  );
};

export default SearchedWebtoonContainer;