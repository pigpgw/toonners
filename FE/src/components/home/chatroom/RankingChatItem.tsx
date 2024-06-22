import styles from "@styles/home/Home.module.scss";
import Text from "@components/common/Text";
import Badge from "@components/common/Badge";
import { RankChatRoomInfoConfig } from "@/interface/ChatRoom.interface";
import Button from "@/components/common/Button";
import { useNavigate } from "react-router-dom";
import { useFetchTopChatList } from "@/api/reactQuery/useChat";

interface Props {
  item: RankChatRoomInfoConfig;
}

const RankingChatItem = ({ item }: Props) => {
  const navigate = useNavigate();
  const { topChatListLoading, topChatListError } = useFetchTopChatList();
  if (topChatListLoading) return <div>인기 채팅방 리스트를 불러오는 중입니다.</div>;
  if (topChatListError) return <div>인기 채팅방 리스트 불러오기 실패</div>;
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
                return (
                  <div key={i} className={styles.chat}>
                    <Text>{chat.chatMessage}</Text>
                  </div>
                );
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
