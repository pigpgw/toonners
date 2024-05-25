import styles from "@styles/common/Logo.module.scss";
import LogoImg from "@assets/images/home/Logo.svg?react";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <LogoImg />
    </div>
  );
};

export default Logo;
