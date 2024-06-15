import styles from "@/styles/webtoon/WebtoonBtn.module.scss";

const DeleteWebtoonBtn = ({ ...rest }) => {
  return (
    <div className={styles.deleteBtn} {...rest}>
      x
    </div>
  );
};

export default DeleteWebtoonBtn;
