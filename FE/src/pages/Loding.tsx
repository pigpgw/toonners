import Text from "@/components/common/Text";
import MainImg from "@assets/images/login/MainImg.svg?react";
import styles from "@/styles/loading/index.module.scss";

interface Props {
  comment?: string;
}

const Loading = ({ comment }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Text types="headline" bold="bold">
        {comment}
      </Text>
      <MainImg />
    </div>
  );
};

export default Loading;
