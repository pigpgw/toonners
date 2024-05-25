import { useNavigate, useParams } from "react-router-dom";
import styles from "@styles/home/ChatRoom.module.scss";
import Header from "@components/common/Header";
import Input from "@components/common/Input";
import ChatItem from "@components/home/chatroom/main/ChatItem";
import { useEffect, useState } from "react";
import { getChatCommentList, postChatComment } from "@/api/chat";
import { ChatCommentConfig } from "@/interface/ChatRoom.interface";
import CustomAccordion from "./Accordian";

const USER_ID = 2; // 테스트용 userId

const ChatRoomMain = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const [chatList, setChatList] = useState<ChatCommentConfig[]>([]);
  const [comment, setComment] = useState("");

  const handleBack = () => {
    navigate("/home");
  };

  const writeChatComment = async () => {
    const res = await postChatComment({
      chatRoomId: id!,
      contexts: comment,
    });
    console.log(res);
  };

  useEffect(() => {
    const getChatComments = async () => {
      const res = await getChatCommentList(id!);
      setChatList(res);
    };
    getChatComments();
  }, []);

  return (
    <>
      <Header title="웹툰 이름" before={handleBack} />
      <CustomAccordion />
      <div className={styles.main}>
        <div className={styles.main__chat}>
          <div className={styles.chat__list}>
            {chatList.map((chat, i) => {
              return chat.memberId === USER_ID ? (
                <ChatItem
                  key={i}
                  mine={true}
                  nickname={chat.memberNickname}
                  profileImg={chat.memberImage}
                  time={chat.createdAt}
                  contents={chat.chatMessage}
                />
              ) : (
                <ChatItem
                  key={i}
                  mine={false}
                  nickname={chat.memberNickname}
                  profileImg={chat.memberImage}
                  time={chat.createdAt}
                  contents={chat.chatMessage}
                />
              );
            })}
          </div>
          <div>
            <Input
              types="message"
              value={comment}
              placeholder="내용을 입력해주세요."
              colors="white"
              onChange={(e) => setComment(e.target.value)}
              submit={writeChatComment}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatRoomMain;
