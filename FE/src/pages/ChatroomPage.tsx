import { useEffect, useState } from "react";
import styles from "@styles/home/Home.module.scss";
import HomeChatListFrame from "@components/home/chatroom/HomeChatRoomListFrame";
import MyChatRoom from "@/components/home/chatroom/MyChatRoom";
import Banner from "@assets/images/home/banner1.svg?react";
import CreateButton from "@/components/common/Button/Create";
import { getAllChatRoomList } from "@api/chat";

interface ChatContentsConfig {
  keyword: "today" | "rank" | "rest";
  title: string;
  subtitle: string;
  isMore: boolean;
  more: string;
}

const CHAT_CONTENTS: ChatContentsConfig[] = [
  {
    keyword: "today",
    title: "오늘 뜬 웹툰 Talk",
    subtitle: "오늘 뜬 웹툰을 보고 다같이 이야기 나눠봐요!",
    isMore: true,
    more: "/chatroom/today",
  },
  {
    keyword: "rank",
    title: "실시간 인기 Talk",
    subtitle: "지금 가장 인기있는 웹툰에 대해 같이 이야기해요.",
    isMore: false,
    more: "/",
  },
  {
    keyword: "rest",
    title: "이런 웹툰 Talk도 있어요!",
    subtitle: "다른 사람들은 어떤 웹툰을 보고 있을까요?",
    isMore: true,
    more: "/chatroom/rest",
  },
];

const ChatroomPage = () => {
  return (
    <div className={styles.chatroom}>
      <Banner className={styles.banner} />
      <MyChatRoom />
      {CHAT_CONTENTS.map((item, key) => {
        return (
          <HomeChatListFrame
            key={key}
            keyword={item.keyword}
            title={item.title}
            subtitle={item.subtitle}
            isMore={item.isMore}
            more={item.more}
            list={
              {
                today: [],
                rank: [],
                rest: restList,
              }[item.keyword]
            }
          />
        );
      })}
      <CreateButton />
    </div>
  );
};

export default ChatroomPage;
