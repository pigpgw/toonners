import styles from "@styles/home/Home.module.scss";
import { ChatRoomInfoConfig } from "@/interface/ChatRoom.interface";

interface Props {
  chat: ChatRoomInfoConfig;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MyChatRoomItem = ({ chat }: Props) => {
  return (
    <div className={styles.webtoon__item}>
      <img className={styles.webtoon__img} src={chat.toonImageUrl} alt="" />
      <p className={styles.webtoon__title}> {chat.toonName}</p>
    </div>
  );
};

export default MyChatRoomItem;
