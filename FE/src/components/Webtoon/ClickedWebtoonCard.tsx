import styles from "@/styles/webtoon/SearchedWebtoonCard.module.scss";
import { ReactNode } from "react";
import DeleteWebtoonBtn from "./deleteBtn";

interface Props {
  title: string;
  imgUrl: string;
  children?: ReactNode;
  onRemove?: () => void;
}

const ClickedWebtoonCard = ({ imgUrl, onRemove, children }: Props) => {
  return (
    <div className={styles.ClickeditemContainer} onClick={onRemove}>
      {children}
      {onRemove && <DeleteWebtoonBtn />}
      <img className={styles.img} src={imgUrl} alt="" />
    </div>
  );
};

export default ClickedWebtoonCard;
