import { ReactNode } from "react";
import styles from "@styles/home/Home.module.scss";
import Text from "@components/common/Text";
import Arrow from "@/components/common/Arrow";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  subtitle: string;
  component: ReactNode;
  isMore: boolean;
  more: string;
  onClick?: () => void;
}

const HomeChatListFrame = ({ title, subtitle, component, isMore, more }: Props) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.chatroom__title}>
        <div>
          <Text types="sub-header" bold="semi-bold">
            {title}
          </Text>
          {isMore && <Arrow onClick={() => navigate(more)} />}
        </div>
        <Text types="body-1">{subtitle}</Text>
      </div>
      {component}
    </div>
  );
};

export default HomeChatListFrame;
