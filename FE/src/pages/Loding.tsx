import Text from "@/components/common/Text";
import MainImg from "@assets/images/login/MainImg.svg?react";
import styles from "@/styles/loading/index.module.scss";

interface Props {
  comment?: string;
  imgNeed?: boolean;
}

const Loading = ({ comment, imgNeed = true }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Text types="headline" bold="bold">
        {comment}
      </Text>
      {imgNeed && <MainImg />}
    </div>
  );
};

export default Loading;
