import styles from "@/styles/makeRecommend/makeRecommend.module.scss";
const AddButton = ({ ...rest }) => {
  return (
    <div className={styles.AddButton} {...rest}>
      +
    </div>
  );
};

export default AddButton;
