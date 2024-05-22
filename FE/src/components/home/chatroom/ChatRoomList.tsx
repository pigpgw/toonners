import { ReactNode } from "react";
import styles from "@styles/home/Home.module.scss";
import Text from "@components/common/Text";
import Arrow from "@/components/common/Arrow";

interface Props {
  title: string;
  subtitle: string;
  component: ReactNode;
  onClick?: () => void;
}

const ChatRoomList = ({ title, subtitle, component }: Props) => {
  return (
    <div>
      <div className={styles.chatroom__title}>
        <div>
          <Text types="sub-header" bold="semi-bold">
            {title}
          </Text>
          <Arrow onClick={() => console.log("더보기")} />
        </div>
        <Text types="body-1">{subtitle}</Text>
      </div>
      {component}
    </div>
  );
};

export default ChatRoomList;
