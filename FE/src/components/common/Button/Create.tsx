import { useEffect, useState } from "react";
import styles from "@styles/common/Button.module.scss";
import Text from "@components/common/Text";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";

const CreateButton = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    return () => {
      setIsOpen(true);
    };
  }, []);

  return (
    <>
      {isOpen ? (
        <>
          <div className={styles.create__open} onClick={() => setIsOpen(false)}>
            <div>
              <AddIcon />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.create__close} onClick={() => setIsOpen(true)}>
            <div>
              <div onClick={() => navigate("/chatroom/create")}>
                <ChatBubbleIcon sx={{ color: "var(--color-primary)" }} />
                <Text types="body-2" bold="medium">
                  Talk 만들기
                </Text>
              </div>
              <div onClick={() => navigate("/recommend/new")}>
                <CreateIcon sx={{ color: "var(--color-accent-1)" }} />
                <Text types="body-2" bold="medium">
                  Feed 작성하기
                </Text>
              </div>
            </div>
            <div>
              <CloseIcon />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreateButton;
