import { useEffect, useState } from "react";
import styles from "@styles/home/Home.module.scss";
import Header from "@/components/common/Header";
import Input from "@components/common/Input";
import TodayChatItem from "@components/home/chatroom/TodayChatItem";
import RestChatItem from "@components/home/chatroom/RestChatItem";
import { getAllChatRoomList } from "@/api/chat";

interface Props {
  types: "today" | "rest";
}

const ChatRoomListFrame = ({ types }: Props) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getChatroomList = async () => {
      if (types === "rest") {
        const res = await getAllChatRoomList();
        setList(res);
      }
    };

    getChatroomList();
  }, [types]);

  return (
    <>
      <Header before title={types === "today" ? "오늘 뜬 웹툰" : "전체 Talk"} />
      <div className={styles.chatroom__list}>
        <Input types="search" placeholder="웹툰 이름을 입력하세요." />
        <div className={styles[`${types}`]}>
          {list.map((item, key) => {
            return (
              <div key={key}>
                {
                  {
                    today: <TodayChatItem item={item} />,
                    rest: <RestChatItem item={item} />,
                  }[types]
                }
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ChatRoomListFrame;
