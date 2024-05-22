import styles from "@styles/home/Home.module.scss";
import Text from "@components/common/Text";

const MyChatRoomItem = () => {
  return (
    <div className={styles.webtoon__item}>
      <div className={styles.webtoon__img}></div>
      <Text types="body-2" bold="medium">
        웹툰 이름
      </Text>
    </div>
  );
};

export default MyChatRoomItem;
