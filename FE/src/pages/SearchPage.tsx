import { KeyboardEvent, useState } from "react";
import styles from "@styles/Search.module.scss";
import Header from "@components/common/Header";
import InputWithButton from "@components/common/InputWithButton";
import SearchList from "@components/search/SearchList";
import ButtomNav from "@components/home/BottomNav";
import { getSearchChatRoom } from "@/api/chat";
import { getSearchFeed } from "@/api/feed";
import { ChatRoomInfoConfig } from "@/interface/ChatRoom.interface";
import { FeedListConfig } from "@/interface/Feed.interface";

const SearchPage = () => {
  const [isSearched, setisSearched] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [chatroom, setChatroom] = useState<ChatRoomInfoConfig[]>([]);
  const [feed, setFeed] = useState<FeedListConfig[]>([]);

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || keyword === "") return;
    getSearchList();
  };

  const getSearchList = async () => {
    if (keyword === "") return;
    setisSearched(true);
    const chatroom = await getSearchChatRoom(keyword);
    const feed = await getSearchFeed(keyword);
    setChatroom(chatroom);
    setFeed(feed);
  };

  return (
    <>
      <Header title="전체 검색" />
      <div className={styles.search}>
        <InputWithButton
          inputText={keyword}
          inputChange={(e) => setKeyword(e.target.value)}
          btnName="검색"
          placeHolder="키워드를 입력하세요."
          colors="gray-1"
          onSubmit={getSearchList}
          onKeyDown={handleEnter}
          types="default"
        />
        {isSearched && (
          <div className={styles.list}>
            <SearchList title="chatroom" chatroom={chatroom} feed={feed} />
            <SearchList title="feed" chatroom={chatroom} feed={feed} />
          </div>
        )}
      </div>
      <ButtomNav />
    </>
  );
};

export default SearchPage;
