import SearchedWebtoonCard from "@/components/Webtoon/SearchedWebtoonCard";
import Header from "@/components/common/Header";
import styles from "@/styles/makeRecommend/makeRecommend.module.scss";
import Text from "../../components/common/Text/index";
import Tag from "@/components/common/Tag";
import { useNavigate } from "react-router-dom";

const Step3 = () => {
  const navigate = useNavigate();
  const clickOutBtn = () => {
    console.log("나가기 버튼 누름");
  };

  const clickaddWebtton = () => {
    navigate('/recommend/new/1')
  };

  return (
    <>
      <Header title="웹툰 추천하기" before={clickOutBtn} buttonName="공유" />
      <div className={styles.container}>
        <div style={{ marginLeft: "85px" }}>
          <SearchedWebtoonCard title="웹툰 제목" imgUrl="dasd" />
        </div>
        <hr className={styles.line} style={{ marginTop: "50px" }} />
        <Text types="title" bold="bold">
          별점 매기기
        </Text>
        <div className={styles.tagBox}>
          <Tag label="설레는" clickable />
          <Tag label="무서운" clickable />
          <Tag label="기쁜" clickable />
          <Tag label="환상적인" clickable />
        </div>
        <hr className={styles.line} />
        <Text types="title" bold="bold">
          장르
        </Text>
        <div className={styles.tagBox}>
          <Tag label="공포" clickable />
          <Tag label="로맨스" clickable />
          <Tag label="판타지" clickable />
          <Tag label="학원물" clickable />
        </div>
        <hr className={styles.line} />
        <Text types="title" bold="bold">
          분위기
        </Text>
        <div className={styles.tagBox}>
          <Tag label="설레는" clickable />
          <Tag label="신나는" clickable />
          <Tag label="소름돋는" clickable />
          <Tag label="잔잔한" clickable />
        </div>
      </div>
      <button className={styles.confirm} onClick={clickaddWebtton}>
        추가하기
      </button>
    </>
  );
};

export default Step3;
