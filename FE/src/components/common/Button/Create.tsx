import styles from "@styles/common/Button.module.scss";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  onClick: () => void;
}

const CreateButton = ({ onClick }: Props) => {
  return (
    <div className={styles.plus} onClick={onClick}>
      <AddIcon />
    </div>
  );
};

export default CreateButton;
