import styles from "../../styles/webtoon/SelectedWebtoonBox.module.scss";
import ClickedWebtoonCard from "./ClickedWebtoonCard";
import { UserWebtoonListConfig } from "@/interface/Webtoon.interface";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedList: any[];
  removeSelect?: (webtoon: UserWebtoonListConfig) => void;
}

const SelectedWebtoonBox = ({ selectedList, removeSelect }: Props) => {
  return (
    <div className={styles.SelectedWebtoonBox}>
      {selectedList.map((webtoon) => (
        <ClickedWebtoonCard
          key={webtoon.title}
          title={webtoon.title}
          imgUrl={webtoon.imageUrl}
          onRemove={removeSelect ? () => removeSelect(webtoon) : undefined}
        />
      ))}
    </div>
  );
};

export default SelectedWebtoonBox;
