import styles from "@styles/home/Home.module.scss";
import Text from "@components/common/Text";
import Badge from "@components/common/Badge";
import { RankChatRoomInfoConfig } from "@/interface/ChatRoom.interface";

interface Props {
  item: RankChatRoomInfoConfig;
}

const RankingChatItem = ({ item }: Props) => {
  return (
    <div className={styles.rank__item}>
      <div className={styles.rank__img}>
        <img src={item.toonImageUrl} alt="웹툰 이미지" />

        <Badge label={`🔥 ${item.fireTotalCount}`} sizes="small" types="primary" />
      </div>
      <div>
        <Text types="title" bold="semi-bold">
          {item.toonName}
        </Text>
        <div className={styles.rank__comments}>
          {item.chatList &&
            item.chatList.length > 0 &&
            item.chatList.slice(0, 2).map((chat, i) => {
              return <Text key={i}>{chat.chatMessage}</Text>;
            })}
        </div>
      </div>
    </div>
  );
};

export default RankingChatItem;
