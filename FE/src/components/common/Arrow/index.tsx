import styles from "@styles/common/Arrow.module.scss";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Text from "@components/common/Text";

interface Props {
  onClick: () => void;
}

const Arrow = ({ ...rest }: Props) => {
  return (
    <div className={styles.arrow} {...rest}>
      <Text types="body-2">더보기</Text>
      <KeyboardArrowRightIcon />
    </div>
  );
};

export default Arrow;
