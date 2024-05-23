import styles from "@styles/home/ChatRoom.module.scss";
import Header from "@components/common/Header";
import Text from "@components/common/Text";
import Tag from "@/components/common/Tag";
import Input from "@/components/common/Input";
import ChatItem from "./ChatItem";
import { useNavigate } from "react-router-dom";

const ChatRoomMain = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/home");
  };
  return (
    <>
      <Header title="" before={handleBack} button={true} buttonName="스크랩" />
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
          <Tag label="🔥600" size="small" />
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
            <Input placeholder="내용을 입력해주세요." colors="white" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatRoomMain;
