import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import styles from "@styles/common/InequalitySign.module.scss";

interface Props {
  onClick: () => void;
}

const InequalitySign = ({ onClick }: Props) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <KeyboardArrowRightIcon />
    </div>
  );
};

export default InequalitySign;
