import { useNavigate } from "react-router-dom";
import styles from "@styles/home/Home.module.scss";
import Text from "../common/Text";

const HomeTab = () => {
  const navigate = useNavigate();
  const clicked = window.location.pathname === "/home" ? "--clicked" : "";

  const handleChatroom = () => {
    navigate("/home");
  };

  const handleRecommend = () => {
    navigate("/home/recommend");
  };

  return (
    <div className={styles.tabList}>
      <div className={styles[`tab__chat${clicked}`]} onClick={handleChatroom}>
        <Text types="headline" bold="semi-bold">
          Talk
        </Text>
        {clicked !== "" && <div />}
      </div>
      <div className={styles[`tab__feed${clicked}`]} onClick={handleRecommend}>
        <Text types="headline" bold="semi-bold">
          Feed
        </Text>
        {clicked === "" && <div />}
      </div>
    </div>
  );
};

export default HomeTab;
