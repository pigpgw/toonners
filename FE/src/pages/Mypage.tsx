import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { checkValidNickname, getOnMyData, postLogOut, postWithDraw, updateUserData } from "@/api/myPage";
import { useUserStore } from "@/slices/useStore";
import Text from "@/components/common/Text";
import Modal from "@/components/common/Modal";
import BottomNav from "@/components/mypage/ButtonNav";
import MainProfile from "@components/mypage/MainProfile";
import MyWebtoonContainer from "@/components/mypage/MyWebtoonContainer";
import styles from "../styles/mypage/Mypage.module.scss";
import { SUCCESS_MESSAGE } from "@/constants/SuccessTypes";
import { ERROR_MESSAGE } from "@/constants/ErrorTypes";
import { filterNickname } from "@/utils/filterValue";

const Mypage = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [logOutModal, setLogOutModal] = useState(false);
  const [withDrawModal, setWithDrawModal] = useState(false);
  const [originUserInfo, setOriginUserInfo] = useState({
    nickname: "",
    description: "",
  });
  const { user, setUser } = useUserStore();
  const nicknameChanged = user.nickname !== originUserInfo.nickname;
  const descriptionChanged = user.description !== originUserInfo.description;

  const onEditMode = () => {
    setEditMode(true);
  };

  const withDraw = async () => {
    try {
      await postWithDraw();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      alert(SUCCESS_MESSAGE.WITHDRAW_SUCCESS_ALERT);
      navigate("/");
    } catch (e) {
      console.log(e);
      throw new Error(ERROR_MESSAGE.WITHDRAW_ERROR);
    }
  };

  const logOut = async () => {
    try {
      await postLogOut();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      alert(SUCCESS_MESSAGE.LOGOUT_SUCCESS_ALERT);
      navigate("/");
    } catch (e) {
      throw new Error(ERROR_MESSAGE.LOGOUT_ERROR);
    }
  };

  const offEditMode = async () => {
    const isValidNickname = filterNickname(user.nickname);

    try {
      if (!isValidNickname) {
        alert(ERROR_MESSAGE.INVALID_NICKNAME);
        fetchData();
        return;
      }

      if (nicknameChanged || descriptionChanged) {
        if (nicknameChanged) {
          await checkValidNickname({
            nickname: user.nickname,
          });
        }

        await updateUserData({
          ...(nicknameChanged && { nickname: user.nickname }),
          ...(descriptionChanged && { description: user.description }),
        });
      }
      setEditMode(false);
    } catch (e) {
      if (e instanceof AxiosError && e.response?.data?.message) {
        alert(e.response.data.message);
      } else {
        alert(ERROR_MESSAGE.FAIL_MODIFY);
      }
      fetchData();
    }
  };

  const fetchData = async () => {
    try {
      const res = await getOnMyData();
      setUser(res);
      setOriginUserInfo({
        nickname: res.nickname,
        description: res.description,
      });
    } catch (e) {
      alert(ERROR_MESSAGE.FETCH_MT_DATA_ERROR);
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
