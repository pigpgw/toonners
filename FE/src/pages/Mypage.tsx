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
import Modal from "@/components/common/Modal";

const Mypage = () => {
  const [editMode, setEditMode] = useState(false);
  const [logOutModal, setLogOutModal] = useState(false);
  const [withDrawModal, setWithDrawModal] = useState(false);
  const navigate = useNavigate();
  const { user, setUser, setUserNickname, setDescription } = useUserStore();

  const onEditMode = () => {
    setEditMode(true);
  };

  const withDraw = async () => {
    try {
      await postWithDraw();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      alert("회원 탈퇴되었습니다.!");
      navigate("/");
    } catch (e) {
      throw new Error("회원탈퇴 실패");
    }
  };

  const logOut = async () => {
    try {
      await postLogOut();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      alert("로그아웃 되었습니다.!");
      navigate("/");
    } catch (e) {
      throw new Error("로그아웃 실패");
    }
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
    try {
      const res = await getOnMyData();
      setUserNickname(res.nickname);
      setDescription(res.description);
      if (res) {
        setUser(res as UserConfig);
      }
    } catch (e) {
      alert("내 정보 가져오기 실패");
      navigate("/");
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
        {logOutModal && (
          <Modal
            open={logOutModal}
            onClose={() => setLogOutModal(false)}
            btnTitle="로그아웃"
            title={
              <div className={styles.text}>
                <Text types="title" bold="semi-bold">
                  정말 로그아웃 하시겠습니까?
                </Text>
              </div>
            }
            onClick={logOut}
          />
        )}
        <div className={styles.withdrawBtn} onClick={() => setLogOutModal(true)}>
          로그아웃
        </div>
        {withDrawModal && (
          <Modal
            open={withDrawModal}
            onClose={() => setWithDrawModal(false)}
            btnTitle="회원 탈퇴"
            title={
              <div className={styles.text}>
                <Text types="title" bold="semi-bold">
                  정말 탈퇴 하시겠습니까?
                </Text>
              </div>
            }
            onClick={withDraw}
          />
        )}
        <div className={styles.withdrawBtn} onClick={() => setWithDrawModal(true)}>
          서비스 탈퇴
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default Mypage;
