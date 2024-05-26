import styles from "@/styles/makeRecommend/makeRecommend.module.scss";
import Text from "../common/Text";
const AddButton = ({ ...rest }) => {
  return (
    <div className={styles.AddButton} {...rest}>
      <Text types="headline" bold="bold">
        {" "}
        +{" "}
      </Text>
      <Text>웹툰 추가하기</Text>
    </div>
  );
};

export default AddButton;
