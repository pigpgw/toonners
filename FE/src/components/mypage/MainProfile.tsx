import styles from "@styles/mypage/Mypage.module.scss";
import Profile from "./Profile";
import Text from "../common/Text";
import EditBtn from "../common/Button/Edit";

interface Props {
  imgUrl: string;
  nickName: string;
  introduction: string;
  clickEditBtn: () => void;
}

const MainProfile = ({ nickName, introduction, imgUrl, clickEditBtn }: Props) => {
  return (
    <div className={styles.ProfileContainer}>
      <div className={styles.btnWrapper}>
        <Profile imgUrl={imgUrl} />
        <EditBtn btnName="편집하기" onClick={clickEditBtn} />
      </div>
      <Text types="title" bold="bold">
        {nickName}
      </Text>
      <Text types="body-1" bold="semi-bold">
        {introduction}
      </Text>
    </div>
  );
};

export default MainProfile;
