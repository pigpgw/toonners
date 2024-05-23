import styles from "@/styles/webtoon/SearchedWebtoonCard.module.scss";
import { ReactNode } from "react";

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
      <p className={styles.title}>{title}</p>
    </div>
  ) : (
    <div key={key} className={styles.ClickeditemContainer} onClick={onClick}>
      {children}
      <img className={styles.img} src={imgUrl} alt="" />
      <p className={styles.title}>{title}</p>
    </div>
  );
};

export default SearchedWebtoonCard;
