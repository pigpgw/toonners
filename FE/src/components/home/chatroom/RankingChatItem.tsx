import styles from "@styles/home/Home.module.scss";
import Text from "@components/common/Text";
import Badge from "@components/common/Badge";
import { RankChatRoomInfoConfig } from "@/interface/ChatRoom.interface";
import Button from "@/components/common/Button";
import { useNavigate } from "react-router-dom";

interface Props {
  item: RankChatRoomInfoConfig;
}

const RankingChatItem = ({ item }: Props) => {
  const navigate = useNavigate();
  return (
    <div className={styles.rank__item}>
      <div>
        <div className={styles.rank__img}>
          <img src={item.toonImageUrl} alt="웹툰 이미지" />
          <Badge label={`🔥 ${item.fireTotalCount === null ? 0 : item.fireTotalCount}`} sizes="small" types="primary" />
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
      <Button types="primary" sizes="small" onClick={() => navigate(`/chatroom/${item.chatRoomId}`)}>
        참여
      </Button>
    </div>
  );
};

export default RankingChatItem;
