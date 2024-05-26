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
      {webtoonList && webtoonList.length !== 0 ? (
        <SelectedWebtoonBox selectedList={webtoonList} />
      ) : (
        <div style={{ width: "100%", fontSize: "12px", color: "gray", textAlign: "center", padding: "10px 0" }}>
          웹툰을 추가해주세요
        </div>
      )}
    </div>
  );
};

export default MyWebtoonContainer;
