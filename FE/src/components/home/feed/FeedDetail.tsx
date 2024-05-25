import styles from "@styles/home/Home.module.scss";
import Header from "@/components/common/Header";
import Profile from "@/components/common/Profile";
import Tag from "@/components/common/Tag";
import Text from "@/components/common/Text";
import FeedDetailCard from "./FeedDetailCard";

const FeedDetail = () => {
  return (
    <>
      <Header title="피드 제목" before={() => console.log("before")} />
      <div className={styles.feed__detail}>
        <div>
          <Profile name="닉네임" size="medium" number="6" />
        </div>
        <div>
          <div>
            <Text types="caption">장르</Text>
            <div>
              <Tag label="# 장르" sizes="small" />
              <Tag label="# 장르" sizes="small" />
              <Tag label="# 장르" sizes="small" />
            </div>
          </div>
          <div>
            <Text types="caption">분위기</Text>
            <div>
              <Tag label="# 장르" sizes="small" />
              <Tag label="# 장르" sizes="small" />
              <Tag label="# 장르" sizes="small" />
            </div>
          </div>
        </div>
        <div>
          <Text>
            올해 가장 사랑받은 웹툰을 소개해볼게요! 여러분들의 마음을 사로잡은 인기 웹툰 10가지를 선정했습니다.이
            작품들은 각자의 독특한 매력과 이야기로 수많은 독자들의 마음을 사로잡았습니다. 웹툰은 다양한 장르와 이야기를
            통해 우리에게 새로운 세계를 보여주고, 때로는 감정을 전달하기도 합니다. 이런 작품들은 독자들에게 특별한
            순간을 선사하며 그들의 삶에 활력을 불어넣습니다. "여신강림"은 주인공의 성장과 사랑을 그린 이야기로, 독자들은
            그녀의 변신과 함께 성장하는 모습에 공감했습니다. "하루만 네가 되고 싶어"는 재미있는 소재와 반전으로 많은
            이들을 끌어모았습니다. "악마와 계약연애"는 로맨스물에 판타지적인 요소를 더해 독특한 매력을 선보였습니다.
            "소녀의 세계"는 사회 문제와 여성의 성장을 다룬 작품으로, 독자들은 주인공과 함께 여러가지 문제에 대해
            공감하고 생각했습니다. "기기괴괴"는 오싹한 공포와 스릴로 많은 이들을 사로잡았습니다. "후아유!"는 학원물로
            다양한 캐릭터와 이야기를 통해 많은 팬을 확보했습니다.
          </Text>
        </div>
        <div>
          <FeedDetailCard />
          <FeedDetailCard />
          <FeedDetailCard />
        </div>
      </div>
    </>
  );
};

export default FeedDetail;
