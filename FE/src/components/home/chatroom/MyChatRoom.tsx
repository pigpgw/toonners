import styles from "@styles/home/Home.module.scss";
import Text from "@components/common/Text";
import MyChatRoomItem from "@components/home/chatroom/MyChatRoomItem";
import { ChatRoomInfoConfig } from "@/interface/ChatRoom.interface";

interface Props {
  chatList: ChatRoomInfoConfig[] | undefined;
}

const MyChatRoom = ({ chatList }: Props) => {
  return (
    <div>
      <Text types="sub-header" bold="semi-bold">
        내가 참여 중인 Talk
      </Text>
      <div className={styles.webtoon}>
        <div className={styles.webtoon__items}>
          {chatList &&
            (chatList.length >= 1 ? (
              chatList.map((chat, index: number) => {
                return <MyChatRoomItem key={index} chat={chat} />;
              })
            ) : (
              <div className={styles.infoText}>
                <Text types="body-2">참여중인 채팅방이 없습니다.</Text>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyChatRoom;
