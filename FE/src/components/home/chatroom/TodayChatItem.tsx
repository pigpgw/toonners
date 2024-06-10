import styles from "@styles/home/Home.module.scss";
import Text from "@components/common/Text";
import Button from "@components/common/Button";
import Rating from "@components/common/Rating";
import Badge from "@components/common/Badge";
import { ChatRoomInfoConfig } from "@/interface/ChatRoom.interface";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface Props {
  item: ChatRoomInfoConfig;
}

const TodayChatItem = ({ item }: Props) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("오늘뜬 웹툰 톡", item);
  }, []);
  return (
    <div className={styles.today__item}>
      <div>
        <div>
          <img src={item.toonImageUrl} alt="대체" />
        </div>
        <div className={styles.today__info}>
          <Text types="title" bold="semi-bold">
            {item.toonName}
          </Text>
          <Rating defaultValue={item.rating} sizes="small" readOnly />
          <Badge label={`🔥 ${item.fireTotalCount ? item.fireTotalCount : 0}`} sizes="small" types="primary" />
        </div>
      </div>
      <Button types="primary" sizes="small" onClick={() => navigate(`/chatroom/${item.chatRoomId}`)}>
        참여
      </Button>
    </div>
  );
};

export default TodayChatItem;
