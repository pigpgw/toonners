import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "@styles/home/ChatRoom.module.scss";
import Header from "@components/common/Header";
import Input from "@components/common/Input";
import ChatItem from "@components/home/chatroom/main/ChatItem";
import CustomAccordion from "./Accordian";
import { getChatCommentList, postChatComment } from "@api/chat";
import { ChatCommentConfig } from "@/interface/ChatRoom.interface";

const USER_ID = 2; // 테스트용 userId

const ChatRoomMain = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const [chatList, setChatList] = useState<ChatCommentConfig[]>([]);
  const [comment, setComment] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  const handleBack = () => {
    navigate("/home");
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || comment === "") return;
    writeChatComment();
  };

  const writeChatComment = async () => {
    const res: ChatCommentConfig = await postChatComment({
      chatRoomId: id!,
      contexts: comment,
    });
    setChatList([...chatList, res]);
    setComment("");
  };

  useEffect(() => {
    const getChatComments = async () => {
      const res = await getChatCommentList(id!);
      setChatList(res);
    };
    getChatComments();
  }, []);

  useEffect(() => {
    // 맨 처음 로딩 시 스크롤이 제일 하단에 위치.
    if (endRef.current) {
      console.log(endRef);
      endRef.current.scrollIntoView();
    }
  }, [chatList]);

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
            <div ref={endRef} />
          </div>
          <div>
            <Input
              types="message"
              value={comment}
              placeholder="내용을 입력해주세요."
              colors="white"
              submit={writeChatComment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={handleEnter}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatRoomMain;
