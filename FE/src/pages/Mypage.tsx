/* eslint-disable @typescript-eslint/no-explicit-any */
// Mypage Component
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOnMyData, updateUserData } from "@/api/myPage";
import { useUserStore } from "@/slices/useStore";
import MainProfile from "@components/mypage/MainProfile";
import Text from "@/components/common/Text";
import MyWebtoonContainer from "@/components/mypage/MyWebtoonContainer";
import styles from "../styles/mypage/Mypage.module.scss";
import ButtomNav from "@/components/mypage/ButtonNav";

type User = {
  id: number;
  email: string;
  nickname: string;
  description: string;
  image: string | null;
  favoriteToons: any;
  watchingToons: any;
};

const Mypage = () => {
  const [fetchUser, setfetchUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const { user } = useUserStore();

  const onEditMode = () => {
    setEditMode(true);
  };

  const offEditMode = async () => {
    setEditMode(false);
    try {
      await updateUserData({
        nickname: user.nickname,
        description: user.introduction,
      });
  
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOnMyData();
        console.log("응답 체크", res);
        setfetchUser(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

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

  useEffect(()=> {
    console.log(user.nickname)
  })

  return (
    <>
      {fetchUser ? (
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
            webtoonList={fetchUser.watchingToons}
            onEditMode={editSeeWebttonList}
          />
          <MyWebtoonContainer
            category="인생 웹툰"
            webtoonList={fetchUser.favoriteToons}
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
      ) : (
        <div>Loading...</div>
      )}
      <div style={{ marginTop: "80px" }}></div>
      <ButtomNav />
    </>
  );
};

export default Mypage;
