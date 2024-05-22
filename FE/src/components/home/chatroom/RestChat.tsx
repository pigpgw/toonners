import styles from "@styles/home/Home.module.scss";
import RestChatItem from "@components/home/chatroom/RestChatItem";

const RestChat = () => {
  return (
    <div className={styles.rest}>
      <RestChatItem />
      <RestChatItem />
      <RestChatItem />
    </div>
  );
};

export default RestChat;
