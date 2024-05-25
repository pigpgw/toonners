import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "@styles/home/ChatRoom.module.scss";
import Header from "@components/common/Header";
import InputWithButton from "@/components/common/InputWithButton";
import ChatItem from "@components/home/chatroom/main/ChatItem";
import CustomAccordion from "./Accordian";
import { getChatCommentList, getChatRoom, postChatComment } from "@api/chat";
import { ChatCommentConfig, ChatRoomInfoConfig } from "@/interface/ChatRoom.interface";

const USER_ID = 2; // 테스트용 userId

const ChatRoomMain = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const [chatroomInfo, setChatroomInfo] = useState<ChatRoomInfoConfig>({
    toonName: "",
    toonImageUrl: "",
    toonSiteUrl: "",
    chatRoomId: 0,
    contexts: "",
    fireTotalCount: 0,
    rating: 0,
  });
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

  const handleEmoji = async () => {
    console.log("cick");
  };

  useEffect(() => {
    const getChatRoomInfo = async () => {
      const res = await getChatRoom(id!);
      setChatroomInfo(res);
    };
    const getChatComments = async () => {
      const res = await getChatCommentList(id!);
      setChatList(res);
    };
    getChatRoomInfo();
    getChatComments();
  }, []);

  useEffect(() => {
    // 맨 처음 로딩 시 스크롤이 제일 하단에 위치.
    if (endRef.current) {
      endRef.current.scrollIntoView();
    }
  }, [chatList]);

  return (
    <>
      <Header title={chatroomInfo.toonName} before={handleBack} />
      <CustomAccordion info={chatroomInfo} />
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
            <InputWithButton
              btnName="🔥"
              types="message"
              inputText={comment}
              placeHolder="내용을 입력해주세요."
              colors="white"
              onSubmit={handleEmoji}
              messageBtn={writeChatComment}
              inputChange={(e) => setComment(e.target.value)}
              onKeyDown={handleEnter}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatRoomMain;
