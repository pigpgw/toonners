import { useNavigate } from "react-router-dom";
import { ChatRoomInfoConfig, RankChatRoomInfoConfig } from "@/interface/ChatRoom.interface";
import Text from "@components/common/Text";
import Arrow from "@components/common/Arrow";
import RestChatItem from "@components/home/chatroom/RestChatItem";
import TodayChatItem from "@components/home/chatroom/TodayChatItem";
import RankingChatItem from "@components/home/chatroom/RankingChatItem";
import styles from "@styles/home/Home.module.scss";

interface Props {
  keyword: "today" | "rank" | "rest";
  title?: string;
  subtitle?: string;
  isMore?: boolean;
  more?: string | undefined;
  list?: (ChatRoomInfoConfig | RankChatRoomInfoConfig)[];
  onClick?: () => void;
}

const isRankChatRoomInfoConfig = (
  item: ChatRoomInfoConfig | RankChatRoomInfoConfig,
): item is RankChatRoomInfoConfig => {
  return (item as RankChatRoomInfoConfig).chatList !== undefined;
};

const HomeChatListFrame = ({ keyword, title, subtitle, isMore, more, list }: Props) => {
  const navigate = useNavigate();
  if (!Array.isArray(list)) {
    return null;
  }

  return (
    <div className={styles.frame}>
      <div className={styles.chatroom__title}>
        <div>
          <Text types="sub-header" bold="semi-bold">
            {title}
          </Text>
          {isMore && <Arrow onClick={() => navigate(more || "")} />}
        </div>
        <Text types="body-1">{subtitle}</Text>
      </div>
      <div className={styles[`${keyword}`]}>
        {list.length >= 1 ? (
          list.map((item, i) => {
            if (keyword === "rank" && isRankChatRoomInfoConfig(item)) {
              return <RankingChatItem key={i} item={item} />;
            }
            if (keyword === "today") {
              return <TodayChatItem key={i} item={item} />;
            }
            if (keyword === "rest") {
              return <RestChatItem key={i} item={item} />;
            }
          })
        ) : (
          <div className={styles.none}>
            <Text types="body-2">검색 결과가 없습니다.</Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeChatListFrame;
