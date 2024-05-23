import { ReactNode } from "react";
import styles from "@styles/home/Home.module.scss";
import Header from "@/components/common/Header";
import Input from "@components/common/Input";
import TodayChatItem from "@components/home/chatroom/TodayChatItem";
import RestChatItem from "@components/home/chatroom/RestChatItem";
import { useNavigate } from "react-router-dom";

interface PageListConfig {
  [key: string]: {
    title: string;
    list: [];
    component: ReactNode;
  };
}

const PAGE_LIST: PageListConfig = {
  today: {
    title: "오늘 뜬 웹툰",
    list: [],
    component: <TodayChatItem />,
  },
  rest: {
    title: "전체 채팅방",
    list: [],
    component: <RestChatItem />,
  },
};

interface Props {
  types: "today" | "rest";
}

const ChatRoomListFrame = ({ types }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <Header title={PAGE_LIST[types].title} before={() => navigate(-1)} />
      <div className={styles.chatroom__list}>
        <Input types="search" placeholder="웹툰 이름을 입력하세요." />
        <div className={styles[`${types}`]}>
          {Array.from({ length: 5 }, () => 0).map((_, key) => {
            return <div key={key}>{PAGE_LIST[types].component}</div>;
          })}
        </div>
      </div>
    </>
  );
};

export default ChatRoomListFrame;
