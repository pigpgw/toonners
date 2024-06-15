import { UserWebtoonListConfig } from "@/interface/Webtoon.interface";
import ClickedWebtoonCard from "./ClickedWebtoonCard";
import styles from "../../styles/webtoon/SelectedWebtoonBox.module.scss";

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
