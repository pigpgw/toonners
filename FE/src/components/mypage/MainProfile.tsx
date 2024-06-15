import { ChangeEvent } from "react";
import Profile from "./Profile";
import Text from "../common/Text";
import EditBtn from "../common/Button/Edit";
import { useUserStore } from "@/slices/useStore";
import styles from "@styles/mypage/Mypage.module.scss";

interface Props {
  imgUrl: string;
  nickName: string;
  introduction: string;
  editMode?: boolean;
  onEditMode?: () => void;
  offEditMode?: () => void;
  edit?: boolean;
}

const MainProfile = ({
  nickName,
  introduction,
  imgUrl,
  edit,
  editMode,
  onEditMode = () => {},
  offEditMode = () => {},
}: Props) => {
  const { user, setDescription, setUserNickname } = useUserStore();

  const nicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserNickname(e.target.value);
  };

  const introductionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <div className={styles.ProfileContainer}>
      <div className={styles.btnWrapper}>
        <Profile imgUrl={imgUrl} />
        {edit &&
          (editMode ? (
            <EditBtn btnName="완료하기" onClick={offEditMode} />
          ) : (
            <EditBtn btnName="편집하기" onClick={onEditMode} />
          ))}
      </div>
      {editMode ? (
        <input type="text" className={styles.EditInput} value={user.nickname} onChange={nicknameChange} />
      ) : (
        <Text types="title" bold="bold">
          {nickName}
        </Text>
      )}
      {editMode ? (
        <input type="text" className={styles.EditInput} value={user.description} onChange={introductionChange} />
      ) : (
        <Text types="body-1" bold="semi-bold">
          {introduction ? introduction : "자기 소개글을 추가해 주세요"}
        </Text>
      )}
    </div>
  );
};

export default MainProfile;
