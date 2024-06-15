import styles from "@/styles/webtoon/WebtoonBtn.module.scss";

const WebtoonPlusBtn = ({ ...rest }) => {
  return (
    <div className={styles.WebtoonPlusBtn} {...rest}>
      +
    </div>
  );
};

export default WebtoonPlusBtn;
