import styles from "@styles/common/Button.module.scss";
import KakaoIcon from "@assets/images/login/Kakao.svg?react";
import Text from "@components/common/Text";

interface Props {
  onClick: () => void;
}

const KakaoButton = ({ onClick }: Props) => {
  return (
    <button className={styles.button__kakao} onClick={onClick}>
      <KakaoIcon />
      <Text types="button" bold="bold">
        카카오로 로그인
      </Text>
    </button>
  );
};

export default KakaoButton;
