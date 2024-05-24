import styles from "@styles/mypage/Mypage.module.scss";
import Profile from "./Profile";
import Text from "../common/Text";
import EditBtn from "../common/Button/Edit";
import { ChangeEvent } from "react";
import { useUserStore } from "@/slices/useStore";

interface Props {
  imgUrl: string;
  nickName: string;
  introduction: string;
  editMode: boolean;
  onEditMode: () => void;
  offEditMode: () => void;
}

const MainProfile = ({ nickName, introduction, imgUrl, editMode, onEditMode, offEditMode }: Props) => {
  const { user, setIntroDuction, setUserNickname } = useUserStore();

  const nicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserNickname(e.target.value);
  };

  const introductionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIntroDuction(e.target.value);
  };

  return (
    <div className={styles.ProfileContainer}>
      <div className={styles.btnWrapper}>
        <Profile imgUrl={imgUrl} />
        {editMode ? (
          <EditBtn btnName="완료하기" onClick={offEditMode} />
        ) : (
          <EditBtn btnName="편집하기" onClick={onEditMode} />
        )}
      </div>
      {editMode ? (
        <input type="text" className={styles.EditInput} value={user.nickname} onChange={nicknameChange} />
      ) : (
        <Text types="title" bold="bold">
          {nickName}
        </Text>
      )}
      {editMode ? (
        <input type="text" className={styles.EditInput} value={user.introduction} onChange={introductionChange} />
      ) : (
        <Text types="body-1" bold="semi-bold">
          {introduction}
        </Text>
      )}
    </div>
  );
};

export default MainProfile;
