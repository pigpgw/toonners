import styles from "@styles/home/Home.module.scss";
import { ChatRoomInfoConfig } from "@/interface/ChatRoom.interface";

interface Props {
  chat: ChatRoomInfoConfig;
}

const MyChatRoomItem = ({ chat }: Props) => {
  return (
    <div className={styles.webtoon__item}>
      <img className={styles.webtoon__img} src={chat.toonImageUrl} alt="" />
      <p className={styles.webtoon__title}> {chat.toonName}</p>
    </div>
  );
};

export default MyChatRoomItem;
