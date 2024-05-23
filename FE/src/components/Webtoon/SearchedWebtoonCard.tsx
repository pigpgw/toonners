import { ReactNode } from "react";
import styles from "@styles/webtoon/SearchedWebtoonCard.module.scss";
import Text from "@components/common/Text";

interface Props {
  title: string;
  imgUrl: string;
  clicked: boolean;
  key?: string;
  children?: ReactNode;
  onClick: () => void;
}

const SearchedWebtoonCard = ({ title, imgUrl, key, onClick, children, clicked }: Props) => {
  return clicked ? (
    <div key={key} className={styles.itemContainer} onClick={onClick}>
      {children}
      <img className={styles.img} src={imgUrl} alt="" />
      <Text types="body-2" bold="medium">
        {title}
      </Text>
    </div>
  ) : (
    <div key={key} className={styles.ClickeditemContainer} onClick={onClick}>
      {children}
      <img className={styles.img} src={imgUrl} alt="" />
      <Text types="body-2" bold="medium">
        {title}
      </Text>
    </div>
  );
};

export default SearchedWebtoonCard;
