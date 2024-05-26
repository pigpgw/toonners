import { useNavigate } from "react-router-dom";
import styles from "@styles/common/Logo.module.scss";
import LogoImg from "@assets/images/home/Logo.svg?react";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.logo} onClick={() => navigate("/home")}>
      <LogoImg />
    </div>
  );
};

export default Logo;
