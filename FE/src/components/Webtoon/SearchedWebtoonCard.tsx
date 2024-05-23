import { ReactNode } from "react";
import styles from "@styles/webtoon/SearchedWebtoonCard.module.scss";
import Text from "@components/common/Text";
import DeleteWebtoonBtn from "./deleteBtn";

interface Props {
  title: string;
  imgUrl: string;
  clicked: boolean;
  key?: string;
  children?: ReactNode;
  onAdd?: () => void;
  onRemove?: () => void;
}

const SearchedWebtoonCard = ({ title, imgUrl, key, onAdd, onRemove, children, clicked }: Props) => {
  return clicked ? (
    <div key={key} className={styles.ClickeditemContainer} onClick={onRemove}>
      {children}
      <img className={styles.img} src={imgUrl} alt="" />
      <DeleteWebtoonBtn />
    </div>
  ) : (
    <div key={key} className={styles.itemContainer} onClick={onAdd}>
      {children}
      <img className={styles.img} src={imgUrl} alt="" />
      <Text types="body-2" bold="medium">
        {title}
      </Text>
    </div>
  );
};

export default SearchedWebtoonCard;
