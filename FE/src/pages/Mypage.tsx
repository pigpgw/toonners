import Text from "@/components/common/Text";
import styles from "../styles/mypage/Mypage.module.scss";
import MainProfile from "@components/mypage/MainProfile";
import MyWebtoonContainer from "@/components/mypage/MyWebtoonContainer";
import { useUserStore } from "@/slices/useStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
  const { user } = useUserStore();
  const [editMode, setEditMode] = useState(false);

  const onEditMode = () => {
    setEditMode(true);
  };

  const offEditMode = () => {
    setEditMode(false);
  };

  useEffect(() => {
    console.log(user);
  });

  const navigate = useNavigate();

  const editSeeWebttonList = () => {
    navigate("/modify/seeWebttonList");
  };

  const editLikedWebToonList = () => {
    navigate("/modify/likedWebToonList");
  };

  return (
    <div className={styles.container}>
      <Text types="headline" bold="bold">
        마이페이지
      </Text>
      <hr style={{ border: "1px solid white" }} />
      <MainProfile
        editMode={editMode}
        onEditMode={onEditMode}
        offEditMode={offEditMode}
        nickName={user.nickname}
        introduction={user.introduction}
        imgUrl="asd"
      />
      <MyWebtoonContainer webtoonList={user.seeWebttonList} onEditMode={editSeeWebttonList} />
      <MyWebtoonContainer webtoonList={user.likedWebToonList} onEditMode={editLikedWebToonList} />
      <div className={styles.FeedContainer}>
        <Text types="title" bold="bold">
          Feed
        </Text>
        <Text bold="semi-bold">내 스크랩 목록</Text>
        <hr className={styles.line} />
        <Text bold="semi-bold">내가 작성한 Feed글</Text>
      </div>
      <div className={styles.withdrawBtn}>서비스 탈퇴하기</div>
    </div>
  );
};

export default Mypage;
