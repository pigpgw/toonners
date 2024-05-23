import styles from "@styles/home/ChatRoom.module.scss";
import Profile from "@/components/common/Profile";
import Text from "@/components/common/Text";

interface Props {
  mine: boolean;
  contents: string;
}

const ChatItem = ({ mine, contents }: Props) => {
  const isMine = mine ? "--mine" : "";
  return (
    <div className={styles.chat}>
      {!mine && <Profile size="small" name="Cody Fisher" />}
      <div className={styles[`chat__info${isMine}`]}>
        <div>
          <Text>{contents}</Text>
        </div>
        <div>
          <Text types="caption">08:20 pm</Text>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
