import styles from "@styles/Search.module.scss";
import Text from "@components/common/Text";
import RestChatItem from "@components/home/chatroom/RestChatItem";
import FeedItem from "@components/home/feed/FeedItem";
import { ChatRoomInfoConfig } from "@/interface/ChatRoom.interface";
import { FeedListConfig } from "@/interface/Feed.interface";

interface Props {
  title: "chatroom" | "feed";
  chatroom: ChatRoomInfoConfig[];
  feed: FeedListConfig[];
}

const SearchList = ({ title, chatroom, feed }: Props) => {
  return (
    <div className={styles.contents}>
      <Text types="sub-header" bold="semi-bold">
        {title === "chatroom" ? "채팅방" : "피드"}
      </Text>
      {title === "chatroom" ? (
        <>
          {chatroom.length > 0 ? (
            <div className={styles.items}>
              {chatroom.map((item, i) => {
                return <RestChatItem key={i} item={item} />;
              })}
            </div>
          ) : (
            <div className={styles.none}>
              <Text types="body-2">검색 결과가 없습니다.</Text>
            </div>
          )}
          <hr />
        </>
      ) : (
        <>
          {feed.length > 0 ? (
            <div className={styles.items}>
              {feed.map((item, i) => {
                return <FeedItem key={i} feed={item} />;
              })}
            </div>
          ) : (
            <div className={styles.none}>
              <Text types="body-2">검색 결과가 없습니다.</Text>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchList;
