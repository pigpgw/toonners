import Text from "@/components/common/Text";
import styles from "../styles/mypage/Mypage.module.scss";
import MainProfile from "@components/mypage/MainProfile";
import MyWebtoonContainer from "@/components/mypage/MyWebtoonContainer";
import { WebtoonConfig } from "@/interface/Webtoon.interface";
import { useState } from "react";

interface UserConfig {
  nickname: string;
  introduction: string;
  seeWebttonList: WebtoonConfig[];
  likedWebToonList: WebtoonConfig[];
}

const Mypage = () => {
  const [user, setUser] = useState<UserConfig>({
    nickname: "박건우",
    introduction: "저는 돼지 바보입니다.",
    seeWebttonList: [
      {
        title: "나 혼자 네크로맨서",
        url: "https://m.comic.naver.com/webtoon/list?titleId=780170&week=thu",
        img: "https://image-comic.pstatic.net/webtoon/780170/thumbnail/thumbnail_IMAG21_c8b82359-da45-480c-95fd-aa9ae794d6be.jpg",
        updateDays: ["thu"],
        fanCount: 10,
      },
      {
        title: "나 혼자 만렙 뉴비",
        url: "https://m.comic.naver.com/webtoon/list?titleId=773797&week=fri",
        img: "https://image-comic.pstatic.net/webtoon/773797/thumbnail/thumbnail_IMAG21_4dda13fe-417f-45b9-9696-880f2487d41d.jpg",
        updateDays: ["fri"],
        fanCount: 50,
      },
      {
        title: "나 혼자 천재 DNA",
        url: "https://page.kakao.com/content/55539370",
        img: "//dn-img-page.kakao.com/download/resource?kid=blkdsb/hzCteeVP1O/E7XZne3KmwCf2FchEmOj2k&filename=th3",
        updateDays: ["wed"],
        fanCount: 1315,
      },
      {
        title: "나 혼자만 레벨업",
        url: "https://page.kakao.com/content/50866481",
        img: "//dn-img-page.kakao.com/download/resource?kid=xlYgE/hzMT3A4qrx/EFeMF4WPAB6G7m7ftD2dU0&filename=th3",
        updateDays: ["thu"],
        fanCount: 39000,
      },
    ],
    likedWebToonList: [
      {
        title: "나 혼자 네크로맨서",
        url: "https://m.comic.naver.com/webtoon/list?titleId=780170&week=thu",
        img: "https://image-comic.pstatic.net/webtoon/780170/thumbnail/thumbnail_IMAG21_c8b82359-da45-480c-95fd-aa9ae794d6be.jpg",
        updateDays: ["thu"],
        fanCount: 10,
      },
      {
        title: "나 혼자 만렙 뉴비",
        url: "https://m.comic.naver.com/webtoon/list?titleId=773797&week=fri",
        img: "https://image-comic.pstatic.net/webtoon/773797/thumbnail/thumbnail_IMAG21_4dda13fe-417f-45b9-9696-880f2487d41d.jpg",
        updateDays: ["fri"],
        fanCount: 50,
      },
      {
        title: "나 혼자 천재 DNA",
        url: "https://page.kakao.com/content/55539370",
        img: "//dn-img-page.kakao.com/download/resource?kid=blkdsb/hzCteeVP1O/E7XZne3KmwCf2FchEmOj2k&filename=th3",
        updateDays: ["wed"],
        fanCount: 1315,
      },
      {
        title: "나 혼자만 레벨업",
        url: "https://page.kakao.com/content/50866481",
        img: "//dn-img-page.kakao.com/download/resource?kid=xlYgE/hzMT3A4qrx/EFeMF4WPAB6G7m7ftD2dU0&filename=th3",
        updateDays: ["thu"],
        fanCount: 39000,
      },
    ],
  });
  const clickEditBtn = () => {
    console.log("수정 버튼 클릭");
  };

  return (
    <div className={styles.container}>
      <Text types="headline" bold="bold">
        마이페이지
      </Text>
      <hr style={{ border: "1px solid white" }} />
      <MainProfile nickName={user.nickname} introduction={user.introduction} imgUrl="asd" clickEditBtn={clickEditBtn} />
      <MyWebtoonContainer webtoonList={user.seeWebttonList} clickEditBtn={clickEditBtn} />
      <MyWebtoonContainer webtoonList={user.likedWebToonList} clickEditBtn={clickEditBtn} />
      <div className={styles.FeedContainer}>
        <Text types="title" bold="bold">
          Feed
        </Text>
        <Text bold="semi-bold">내 스크랩 목록</Text>
        <hr className={styles.line} />
        <Text bold="semi-bold">내 스크랩 목록</Text>
      </div>
      <div className={styles.withdrawBtn}>서비스 탈퇴하기</div>
    </div>
  );
};

export default Mypage;
