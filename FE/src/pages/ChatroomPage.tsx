import { useEffect, useState } from "react";
import styles from "@styles/home/Home.module.scss";
import HomeChatListFrame from "@components/home/chatroom/HomeChatRoomListFrame";
import Banner from "@assets/images/home/banner1.svg?react";
import CreateButton from "@/components/common/Button/Create";
import { getAllChatRoomList, getMyTalk, getRankingChatRoomList, getTodayChatRoomList } from "@api/chat";
import MyChatRoom from "@/components/home/chatroom/MyChatRoom";

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

// 전체 게시글 중 랜덤 세 개 추출
const getRandomItems = (list: []) => {
  const allList = [...list];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = [];
  while (result.length < 3) {
    const movenum = allList.splice(Math.floor(Math.random() * allList.length), 1)[0];
    result.push(movenum);
  }
  return result;
};

const ChatroomPage = () => {
  const [myTalkList, setMyTalkList] = useState([]);
  const [todayList, setTodayList] = useState([]);
  const [rankList, setrankList] = useState([]);
  const [restList, setRestList] = useState([]);

  useEffect(() => {
    const getTodayList = async () => {
      const res = await getTodayChatRoomList();
      if (res.length <= 3) setTodayList(res);
      else {
        const result = getRandomItems(res);
        setTodayList(result);
      }
    };

    const getRankingList = async () => {
      const res = await getRankingChatRoomList();
      if (res.length <= 3) setrankList(res);
      else {
        const result = res.slice(0, 3);
        setrankList(result);
      }
    };

    const getRestList = async () => {
      const res = await getAllChatRoomList();
      if (res.length <= 3) setRestList(res);
      else {
        const result = getRandomItems(res);
        setRestList(result);
      }
    };

    getTodayList();
    getRankingList();
    getRestList();
  }, []);

  useEffect(() => {
    fetchMyTalk();
  }, []);

  const fetchMyTalk = async () => {
    const response = await getMyTalk();
    setMyTalkList(response);
  };

  return (
    <>
      <Banner className={styles.banner} />
      <div className={styles.chatroom}>
        <MyChatRoom chatList={myTalkList} />
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
                  today: todayList,
                  rank: rankList,
                  rest: restList,
                }[item.keyword]
              }
            />
          );
        })}
        <CreateButton />
      </div>
    </>
  );
};

export default ChatroomPage;
