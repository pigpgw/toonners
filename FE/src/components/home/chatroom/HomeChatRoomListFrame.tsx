import { useNavigate } from "react-router-dom";
import styles from "@styles/home/Home.module.scss";
import Text from "@components/common/Text";
import Arrow from "@components/common/Arrow";
import RestChatItem from "@components/home/chatroom/RestChatItem";
import TodayChatItem from "@components/home/chatroom/TodayChatItem";
import RankingChatItem from "@components/home/chatroom/RankingChatItem";

interface Props {
  keyword: "today" | "rank" | "rest";
  title: string;
  subtitle: string;
  isMore: boolean;
  more: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list: any[];
  onClick?: () => void;
}

const HomeChatListFrame = ({ keyword, title, subtitle, isMore, more, list = [] }: Props) => {
  const navigate = useNavigate();
  return (
    <div className={styles.frame}>
      <div className={styles.chatroom__title}>
        <div>
          <Text types="sub-header" bold="semi-bold">
            {title}
          </Text>
          {isMore && <Arrow onClick={() => navigate(more)} />}
        </div>
        <Text types="body-1">{subtitle}</Text>
      </div>
      <div className={styles[`${keyword}`]}>
        {list.map((item, i) => {
          return {
            today: <TodayChatItem key={i} item={item} />,
            rank: <RankingChatItem key={i} />,
            rest: <RestChatItem key={i} item={item} />,
          }[keyword];
        })}
      </div>
    </div>
  );
};

export default HomeChatListFrame;
