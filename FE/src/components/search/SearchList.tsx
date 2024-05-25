import styles from "@styles/Search.module.scss";
import Text from "@components/common/Text";
import RestChatItem from "@components/home/chatroom/RestChatItem";
import FeedItem from "@components/home/feed/FeedItem";

interface Props {
  title: "chatroom" | "recommend";
}

const CHATROOM_DATA: number[] = [];
const RECOMMEND_DATA: number[] = [1, 2, 3];

const SearchList = ({ title }: Props) => {
  return (
    <div className={styles.contents}>
      <Text types="sub-header" bold="semi-bold">
        {title === "chatroom" ? "채팅방" : "피드"}
      </Text>
      {title === "chatroom" ? (
        <>
          {CHATROOM_DATA.length > 0 ? (
            <div className={styles.items}>
              {CHATROOM_DATA.map((_, key) => {
                // return <RestChatItem key={key} />;
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
          {RECOMMEND_DATA.length > 0 ? (
            <div className={styles.items}>
              {RECOMMEND_DATA.map((_, key) => {
                // return <FeedItem key={key} />;
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
