import styles from "@styles/common/Header.module.scss";
import InequalitySign from "../InequalitySign";
import Button from "../../common/Button/Confirm";

const Header = () => {
  const clickExitBtn = () => {
    console.log("화살표 버튼 누름");
  };

  return (
    <div className={styles.container}>
      <InequalitySign onClick={clickExitBtn} />
      <Button>공유</Button>
    </div>
  );
};

export default Header;
