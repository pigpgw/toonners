import styles from "@styles/home/Home.module.scss";
import Text from "@components/common/Text";
import Button from "@components/common/Button";
import { ChatRoomInfoConfig } from "@/interface/ChatRoom.interface";
import { useNavigate } from "react-router-dom";
import Badge from "@/components/common/Badge";

interface Props {
  item: ChatRoomInfoConfig;
}

const RestChatItem = ({ item }: Props) => {
  const navigate = useNavigate();
  return (
    <div className={styles.rest__item}>
      <div>
        <div className={styles.rest__img}>
          <img src={item.toonImageUrl} alt="대체" />
        </div>
        <div>
          <Text types="title" bold="semi-bold">
            {item.toonName}
          </Text>
          <Text>{item.contexts}</Text>
          <div className={styles.rest__tags}>
            <Badge
              label={`🔥 ${item.fireTotalCount === null ? 0 : item.fireTotalCount}`}
              sizes="small"
              types="primary"
            />
          </div>
        </div>
      </div>
      <Button types="primary" sizes="small" onClick={() => navigate(`/chatroom/${item.chatRoomId}`)}>
        참여
      </Button>
    </div>
  );
};

export default RestChatItem;
