import styles from "@styles/home/Home.module.scss";
import Text from "@components/common/Text";
import Badge from "@components/common/Badge";

const RankingChatItem = () => {
  return (
    <div className={styles.ranking__item}>
      <div className={styles.ranking__img}>
        <div />
        <Badge label="🔥 NN" sizes="small" types="primary" />
      </div>
      <div>
        <Text types="title" bold="semi-bold">
          웹툰 이름입니다.
        </Text>
        <div className={styles.ranking__comments}>
          <Text>최신 댓글입니다.</Text>
          <Text>최신 댓글입니다.</Text>
        </div>
      </div>
    </div>
  );
};

export default RankingChatItem;
