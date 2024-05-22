import styles from "@styles/home/Home.module.scss";
import TodayChatItem from "@components/home/chatroom/TodayChatItem";

const TodayChat = () => {
  return (
    <div className={styles.today}>
      <TodayChatItem />
      <TodayChatItem />
      <TodayChatItem />
    </div>
  );
};

export default TodayChat;
