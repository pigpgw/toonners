import Text from "../common/Text";
import EditBtn from "../common/Button/Edit";
import SelectedWebtoonBox from "@/components/Webtoon/SelectedWebtoonBox";
import { UserWebtoonListConfig } from "@/interface/Webtoon.interface";
import styles from "../../styles/mypage/Mypage.module.scss";

interface Props {
  category: string;
  webtoonList: UserWebtoonListConfig[];
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
      {webtoonList && webtoonList.length !== 0 ? (
        <SelectedWebtoonBox selectedList={webtoonList} />
      ) : (
        <div className={styles.text}>웹툰을 추가해주세요</div>
      )}
    </div>
  );
};

export default MyWebtoonContainer;
