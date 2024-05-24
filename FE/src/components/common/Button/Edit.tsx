import styles from "@styles/common/Button.module.scss";

interface Props {
  btnName: string;
  onClick: () => void;
}

const EditBtn = ({ btnName, onClick }: Props) => {
  return (
    <button className={styles.EditBtn} onClick={onClick}>
      {btnName}
    </button>
  );
};

export default EditBtn;
