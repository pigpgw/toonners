import styles from "@styles/home/Home.module.scss";
import Text from "@components/common/Text";
import MyChatRoomItem from "@components/home/chatroom/MyChatRoomItem";

const MyChatRoom = () => {
  return (
    <div>
      <Text types="sub-header" bold="semi-bold">
        내가 참여 중인 Talk
      </Text>
      <div className={styles.webtoon}>
        <div className={styles.webtoon__items}>
          <MyChatRoomItem />
          <MyChatRoomItem />
          <MyChatRoomItem />
          <MyChatRoomItem />
          <MyChatRoomItem />
          <MyChatRoomItem />
          <MyChatRoomItem />
        </div>
      </div>
    </div>
  );
};

export default MyChatRoom;
