import { ChangeEvent, useEffect, useState } from "react";
import styles from "@styles/home/Home.module.scss";
import Header from "@/components/common/Header";
import Input from "@components/common/Input";
import TodayChatItem from "@components/home/chatroom/TodayChatItem";
import RestChatItem from "@components/home/chatroom/RestChatItem";
import { getAllChatRoomList, getTodayChatRoomList } from "@/api/chat";
import { ChatRoomInfoConfig } from "../../../interface/ChatRoom.interface";

interface Props {
  types: "today" | "rest";
}

const ChatRoomListFrame = ({ types }: Props) => {
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searchedList, setSearchedList] = useState([]);

  useEffect(() => {
    const getChatroomList = async () => {
      const res = await (types === "rest" ? getAllChatRoomList() : getTodayChatRoomList());
      setList(res);
    };

    getChatroomList();
  }, [types]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    const searched = list.filter((item: ChatRoomInfoConfig) => item.toonName.includes(keyword));
    setSearchedList(searched);
  }, [keyword, list]);

  return (
    <>
      <Header before title={types === "today" ? "오늘 뜬 웹툰" : "전체 Talk"} />
      <div className={styles.chatroom__list}>
        <Input types="search" placeholder="웹툰 이름을 입력하세요." onChange={handleInputChange} />
        <div className={styles[`${types}`]}>
          {searchedList.length === 0
            ? list.map((item, key) => {
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
              })
            : searchedList.map((item, key) => {
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
