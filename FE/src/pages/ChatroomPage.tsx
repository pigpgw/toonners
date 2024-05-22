import styles from "@styles/home/Home.module.scss";
import ChatRoomList from "@components/home/chatroom/ChatRoomList";
import MyChatRoom from "@components/home/chatroom/MyChatRoom";
import RankingChat from "@components/home/chatroom/RankingChat";
import RestChat from "@components/home/chatroom/RestChat";
import TodayChat from "@components/home/chatroom/TodayChat";

const CHAT_CONTENTS = [
  {
    title: "오늘 뜬 웹툰 Talk",
    subtitle: "오늘 뜬 웹툰을 보고 다같이 이야기 나눠봐요!",
    component: <TodayChat />,
  },
  {
    title: "실시간 인기 Talk",
    subtitle: "지금 가장 인기있는 웹툰에 대해 같이 이야기해요.",
    component: <RankingChat />,
  },
  {
    title: "이런 웹툰 Talk도 있어요!",
    subtitle: "다른 사람들은 어떤 웹툰을 보고 있을까요?",
    component: <RestChat />,
  },
];

const ChatroomPage = () => {
  return (
    <div className={styles.chatroom}>
      <MyChatRoom />
      {CHAT_CONTENTS.map((item, key) => {
        return <ChatRoomList key={key} title={item.title} subtitle={item.subtitle} component={item.component} />;
      })}
    </div>
  );
};

export default ChatroomPage;
