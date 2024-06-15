import MainImg from "@assets/images/login/MainImg.svg?react";
import styles from "@/styles/loading/index.module.scss"

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <MainImg />
    </div>
  );
};

export default Loading;
