import {
  useFetchAllChatList,
  useFetchMyChatList,
  useFetchTodayChatList,
  useFetchTopChatList,
} from "@/api/reactQuery/useChat";
import Banner from "@assets/images/home/banner1.svg?react";
import CreateButton from "@/components/home/chatroom/create/CreateButton";
import MyChatRoom from "@/components/home/chatroom/MyChatRoom";
import HomeChatListFrame from "@components/home/chatroom/HomeChatRoomListFrame";
import { CHAT_CONTENTS } from "../constants/pages/ChatroomPage";
import styles from "@styles/home/Home.module.scss";

const ChatroomPage = () => {
  const { myChatListState } = useFetchMyChatList();
  const { todayChatListState } = useFetchTodayChatList();
  const { topChatListState } = useFetchTopChatList();
  const { allChatListState } = useFetchAllChatList();

  return (
    <>
      <Banner className={styles.banner} />
      <div className={styles.chatroom}>
        <MyChatRoom chatList={myChatListState} />
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
                  today: todayChatListState,
                  rank: topChatListState,
                  rest: allChatListState,
                }[item.keyword]
              }
            />
          );
        })}
      </div>
      <CreateButton />
    </>
  );
};

export default ChatroomPage;
