import styles from "@styles/home/Home.module.scss";
import RankingChatItem from "@components/home/chatroom/RankingChatItem";

const RankingChat = () => {
  return (
    <div className={styles.ranking}>
      <RankingChatItem />
      <RankingChatItem />
      <RankingChatItem />
    </div>
  );
};

export default RankingChat;
