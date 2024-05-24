import styles from "../../styles/webtoon/SelectedWebtoonBox.module.scss";
import WebtoonPlusBtn from "./plusBtn";
import { WebtoonConfig } from "@/interface/Webtoon.interface";
import ClickedWebtoonCard from "./ClickedWebtoonCard";

interface Props {
  selectedList: WebtoonConfig[];
  removeSelect: (webtoon: WebtoonConfig) => void;
}

const SelectedWebtoonBox = ({ selectedList, removeSelect }: Props) => {
  return (
    <div className={styles.SelectedWebtoonBox}>
      {selectedList.map((webtoon) => (
        <ClickedWebtoonCard
          title={webtoon.title}
          imgUrl={webtoon.img}
          onRemove={() => removeSelect(webtoon)}
        />
      ))}
      {selectedList.length < 4 ? <WebtoonPlusBtn /> : null}
    </div>
  );
};

export default SelectedWebtoonBox;
