import styles from "@styles/home/ChatRoom.module.scss";
import Profile from "@/components/common/Profile";
import Text from "@/components/common/Text";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

interface Props {
  mine: boolean;
  memberId: number;
  nickname: string;
  profileImg: string;
  contents: string;
  time: string;
}

const ChatItem = ({ mine, memberId, nickname, contents, time }: Props) => {
  const navigate = useNavigate();
  const isMine = mine ? "--mine" : "";
  return (
    <div className={styles.chat}>
      {!mine && <Profile size="small" name={nickname} number={"1"} onClick={() => navigate(`/profile/${memberId}`)} />}
      <div className={styles[`chat__info${isMine}`]}>
        <div>
          <Text>{contents}</Text>
        </div>
        <div>
          <Text types="caption">{dayjs(time).format("HH:mm")}</Text>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
