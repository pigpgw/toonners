import { useNavigate } from "react-router-dom";
import styles from "@/styles/signup/Signup.module.scss";
import Text from "@/components/common/Text";
import Complete from "@assets/images/login/Complete.svg?react";
import { useUserStore } from "@/slices/useStore";
import { updateUserData } from "@/api/myPage";

const Signup3 = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const nextStep = async() => {
    try {
      // 서버에 유저 프로필 등록
      const data = {
        nickname: user.nickname,
        description: user.introduction,
        watching_toons: user.seeWebttonList.map(toon => ({
          title: toon.title,
          image_url: toon.img,
          site_url: toon.url,
          rating: toon.fanCount,
          days: toon.updateDays
        }))
      };
      console.log(data);
      await updateUserData(data);
      navigate("/home");
    } catch (e) {
      alert("등록에 실패하였습니다!");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Text types="headline" bold="bold">
          반가워요! {user.nickname}님
          <br />
          서비스명에 오신 걸 환영해요.
        </Text>
        <Complete />
      </div>
      <button className={styles.confirm} onClick={nextStep}>
        확인
      </button>
    </>
  );
};

export default Signup3;
