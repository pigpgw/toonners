import SelectedWebtoonBox from "@/components/Webtoon/SelectedWebtoonBox";
import styles from "../../styles/mypage/Mypage.module.scss";
import { WebtoonConfig } from "@/interface/Webtoon.interface";
import Text from "../common/Text";
import EditBtn from "../common/Button/Edit";

interface Props {
  category: string;
  webtoonList: WebtoonConfig[];
  onEditMode: () => void;
}

const MyWebtoonContainer = ({ category, webtoonList, onEditMode }: Props) => {
  return (
    <div className={styles.myWebtoonContainer}>
      <div className={styles.myWebtoonSubContainer}>
        <Text types="title" bold="bold">
            {category}
        </Text>
        <EditBtn btnName="편집하기" onClick={onEditMode}></EditBtn>
      </div>
      <SelectedWebtoonBox selectedList={webtoonList} />
    </div>
  );
};

export default MyWebtoonContainer;
