import Text from "@/components/common/Text";
import styles from "../styles/mypage/Mypage.module.scss";
import MainProfile from "@components/mypage/MainProfile";
import MyWebtoonContainer from "@/components/mypage/MyWebtoonContainer";
import { useUserStore } from "@/slices/useStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtomNav from "@/components/mypage/ButtonNav";

const Mypage = () => {
  const { user } = useUserStore();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {});

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
    navigate("/modify/seeWebtoonList");
  };

  const editLikedWebToonList = () => {
    navigate("/modify/likedWebToonList");
  };

  const navigateToMyScrap = () => {
    navigate("/mypage/scrap");
  };

  const navigateToMyFeed = () => {
    navigate("/mypage/feed");
  };

  return (
    <>
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
        <MyWebtoonContainer
          category="내가 보는 웹툰"
          webtoonList={user.seeWebttonList}
          onEditMode={editSeeWebttonList}
        />
        <MyWebtoonContainer
          category="인생 웹툰"
          webtoonList={user.likedWebToonList}
          onEditMode={editLikedWebToonList}
        />
        <div className={styles.FeedContainer}>
          <Text types="title" bold="bold">
            Feed
          </Text>
          <div className={styles.wrp} onClick={navigateToMyScrap}>
            <Text bold="semi-bold">내 스크랩 목록</Text>
          </div>
          <hr className={styles.line} />
          <div className={styles.wrp} onClick={navigateToMyFeed}>
            <Text bold="semi-bold">내가 작성한 Feed글</Text>
          </div>
        </div>
        <div className={styles.withdrawBtn}>서비스 탈퇴하기</div>
      </div>
      <div style={{ marginTop: "80px" }}></div>
      <ButtomNav />
    </>
  );
};

export default Mypage;
