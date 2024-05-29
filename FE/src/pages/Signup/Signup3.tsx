import { useNavigate } from "react-router-dom";
import styles from "@/styles/signup/Signup.module.scss";
import Text from "@/components/common/Text";
import Complete from "@assets/images/login/Complete.svg?react";
import { useUserStore } from "@/slices/useStore";
import { updateUserData } from "@/api/myPage";

const Signup3 = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const nextStep = async () => {
    try {
      const data = {
        nickname: user.nickname,
        description: user.introduction,
        watchingToons: user.seeWebttonList.map((toon) => ({
          title: toon.title,
          imageUrl: toon.imageUrl,
          days: toon.updateDays,
          siteUrl: toon.url,
        })),
      };
      try {
        await updateUserData(data);
        alert("가입이 성공적으로 완료되었습니다.");
      } catch (e) {
        console.log("eeeorro", e);
      }
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
