import { useNavigate } from "react-router-dom";
import styles from "@styles/home/ChatRoom.module.scss";
import Header from "@components/common/Header";
import Text from "@components/common/Text";
import Input from "@components/common/Input";
import Badge from "@components/common/Badge";
import ChatItem from "@components/home/chatroom/main/ChatItem";

const ChatRoomMain = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/home");
  };
  return (
    <>
      <Header title="" before={handleBack} />
      {/* <Accordion sx={{ boxShadow: "none", borderRadius: "0px" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Text types="sub-header" bold="semi-bold">
            웹툰 이름
          </Text>
        </AccordionSummary>
        <AccordionDetails>contents</AccordionDetails>
      </Accordion> */}
      <div className={styles.main}>
        <div>
          <Badge label="🔥 NN" sizes="small" types="primary" />
          <Text types="sub-header" bold="semi-bold">
            웹툰 이름
          </Text>
        </div>
        <div className={styles.main__chat}>
          <div className={styles.chat__list}>
            <ChatItem mine={false} contents="내용입니다. " />
            <ChatItem
              mine={false}
              contents="내용입니다. 내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다."
            />
            <ChatItem mine={true} contents="내용입니다." />
            <ChatItem
              mine={true}
              contents="내용입니다. 내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다."
            />
          </div>
          <div>
            <Input types="message" placeholder="내용을 입력해주세요." colors="white" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatRoomMain;
