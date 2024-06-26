import { useNavigate } from "react-router-dom";
import Text from "@/components/common/Text";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const MakeChatBtn = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/chatroom/create")}>
      <ChatBubbleIcon sx={{ color: "var(--color-primary)" }} />
      <Text types="body-2" bold="medium">
        Talk방 만들기
      </Text>
    </div>
  );
};

export default MakeChatBtn;
