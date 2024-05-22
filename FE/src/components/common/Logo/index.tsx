import styles from "@styles/common/Logo.module.scss";
import Text from "../Text";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <Text types="display" bold="semi-bold">
        LOGO
      </Text>
    </div>
  );
};

export default Logo;
