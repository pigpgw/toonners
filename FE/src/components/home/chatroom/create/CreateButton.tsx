import { useState } from "react";
import styles from "@styles/common/Button.module.scss";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import MakeChatBtn from "@/components/home/chatroom/create/MakeChatBtn";
import MakeFeedBtn from "@/components/home/chatroom/create/MakeFeedBtn";

const CreateButton = () => {
  const [isOpen, setIsOpen] = useState(true);

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
              <MakeFeedBtn />
              <MakeChatBtn />
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
