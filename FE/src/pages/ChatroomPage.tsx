import { useEffect, useState } from "react";
import { CHAT_CONTENTS } from "../constants/pages/ChatroomPage";
import { getAllChatRoomList, getMyTalk, getTodayChatRoomList } from "@api/chat";
import useFetchTopChatList from "@/api/reactQuery/useFetchTopChatList";
import Banner from "@assets/images/home/banner1.svg?react";
import CreateButton from "@/components/home/chatroom/create/CreateButton";
import MyChatRoom from "@/components/home/chatroom/MyChatRoom";
import HomeChatListFrame from "@components/home/chatroom/HomeChatRoomListFrame";
import styles from "@styles/home/Home.module.scss";

const ChatroomPage = () => {
  const [myTalkList, setMyTalkList] = useState([]);
  const [todayList, setTodayList] = useState([]);
  const [restList, setRestList] = useState([]);
  const { topChatListState } = useFetchTopChatList();

  useEffect(() => {
    const getTodayList = async () => {
      const res = await getTodayChatRoomList();
      if (res.length >= 1) setTodayList(res);
      else {
        setTodayList([]);
      }
    };

    const getRestList = async () => {
      const res = await getAllChatRoomList();
      const slicedList = res.slice(0, 3);
      if (res) setRestList(slicedList);
      else setRestList([]);
    };

    getTodayList();
    getRestList();
  }, []);

  const fetchMyTalk = async () => {
    const response = await getMyTalk();
    setMyTalkList(response);
  };

  useEffect(() => {
    fetchMyTalk();
  }, []);

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
                  rank: topChatListState,
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
