/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainProfile from "@components/mypage/MainProfile";
import Text from "@/components/common/Text";
import MyWebtoonContainer from "@/components/mypage/MyWebtoonContainer";
import styles from "../styles/mypage/Mypage.module.scss";
import BottomNav from "@/components/mypage/ButtonNav";
import { getOnMyData, postLogOut, postWithDraw, updateUserData } from "@/api/myPage";
import { useUserStore } from "@/slices/useStore";
import { UserConfig } from "@/interface/Webtoon.interface";

const Mypage = () => {
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const { user, setUser, setUserNickname, setDescription } = useUserStore();

  const onEditMode = () => {
    setEditMode(true);
  };

  const withDraw = async () => {
    await postWithDraw();
    localStorage.removeItem("accessToken");
    alert("회원 탈퇴되었습니다.!");
    navigate("/");
  };

  const logOut = async () => {
    await postLogOut();
    localStorage.removeItem("accessToken");
    alert("로그아웃 되었습니다.!");
    navigate("/");
  };

  const offEditMode = async () => {
    setEditMode(false);
    try {
      await updateUserData({
        nickname: user.nickname,
        description: user.description,
      });
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = async () => {
    const res = await getOnMyData();
    setUserNickname(res.nickname);
    setDescription(res.description);
    if (res) {
      console.log("res", res);
      setUser(res as UserConfig);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editSeeWebtoonList = () => {
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
        <>
          <MainProfile
            editMode={editMode}
            onEditMode={onEditMode}
            offEditMode={offEditMode}
            nickName={user.nickname}
            introduction={user.description}
            imgUrl="asd"
            edit={true}
          />
          <MyWebtoonContainer
            category="내가 보는 웹툰"
            webtoonList={user.watchingToons}
            onEditMode={editSeeWebtoonList}
          />
          <MyWebtoonContainer category="인생 웹툰" webtoonList={user.favoriteToons} onEditMode={editLikedWebToonList} />
        </>
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
        <div className={styles.withdrawBtn} onClick={logOut}>
          로그아웃
        </div>
        <div className={styles.withdrawBtn} onClick={withDraw}>
          서비스 탈퇴
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default Mypage;
