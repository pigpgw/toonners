/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOnMyData, updateUserData } from "@/api/myPage";
import { useUserStore } from "@/slices/useStore";
import MainProfile from "@components/mypage/MainProfile";
import Text from "@/components/common/Text";
import MyWebtoonContainer from "@/components/mypage/MyWebtoonContainer";
import styles from "../styles/mypage/Mypage.module.scss";
import BottomNav from "@/components/mypage/ButtonNav"; 

type User = {
  id: number;
  email: string;
  nickname: string;
  description: string;
  image: string | null;
  favoriteToons: any[];
  watchingToons: any[];
};

const Mypage = () => {
  const [fetchUser, setFetchUser] = useState<User | null>(); 
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const { user } = useUserStore();

  const onEditMode = () => {
    setEditMode(true);
  };

  const withDraw = () => {
    localStorage.removeItem("accessToken");
    alert("회원 탈퇴되었습니다.!");
    navigate("/");
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
        // setFetchUser(res?.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
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
            nickName={fetchUser?.nickname}
            introduction={fetchUser.description}
            imgUrl="asd"
          />
          <MyWebtoonContainer
            category="내가 보는 웹툰"
            webtoonList={fetchUser?.watchingToons}
            onEditMode={editSeeWebtoonList}
          />
          <MyWebtoonContainer
            category="인생 웹툰"
            webtoonList={fetchUser?.favoriteToons}
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
          <div className={styles.withdrawBtn} onClick={withDraw}>
            서비스 탈퇴하기
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <BottomNav /> {/* 'ButtomNav'를 'BottomNav'로 수정 */}
    </>
  );
};

export default Mypage;
