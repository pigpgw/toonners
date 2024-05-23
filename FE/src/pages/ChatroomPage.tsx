import styles from "@styles/home/Home.module.scss";
import Frame from "@components/home/chatroom/HomeChatRoomListFrame";
import MyChatRoom from "@/components/home/chatroom/MyChatRoom";
import RankingChat from "@/components/home/chatroom/RankingChat";
import RestChat from "@/components/home/chatroom/RestChat";
import TodayChat from "@/components/home/chatroom/TodayChat";
import CreateButton from "@/components/common/Button/Create";
import { useNavigate } from "react-router-dom";

const CHAT_CONTENTS = [
  {
    title: "오늘 뜬 웹툰 Talk",
    subtitle: "오늘 뜬 웹툰을 보고 다같이 이야기 나눠봐요!",
    component: <TodayChat />,
    isMore: true,
    more: "/chatroom/today",
  },
  {
    title: "실시간 인기 Talk",
    subtitle: "지금 가장 인기있는 웹툰에 대해 같이 이야기해요.",
    component: <RankingChat />,
    isMore: false,
    more: "/",
  },
  {
    title: "이런 웹툰 Talk도 있어요!",
    subtitle: "다른 사람들은 어떤 웹툰을 보고 있을까요?",
    component: <RestChat />,
    isMore: true,
    more: "/chatroom/rest",
  },
];

const ChatroomPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.chatroom}>
      <MyChatRoom />
      {CHAT_CONTENTS.map((item, key) => {
        return (
          <Frame
            key={key}
            title={item.title}
            subtitle={item.subtitle}
            component={item.component}
            isMore={item.isMore}
            more={item.more}
          />
        );
      })}
      <CreateButton onClick={() => navigate("/chatroom/create")} />
    </div>
  );
};

export default ChatroomPage;
