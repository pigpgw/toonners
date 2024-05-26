import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "@styles/home/ChatRoom.module.scss";
import Header from "@components/common/Header";
import InputWithButton from "@/components/common/InputWithButton";
import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";
import Badge from "@/components/common/Badge";
import ChatItem from "@components/home/chatroom/main/ChatItem";
import CustomAccordion from "./Accordian";
import { getChatCommentList, getChatRoom, postChatComment, postFireComment } from "@api/chat";
import { ChatCommentConfig, ChatRoomInfoConfig } from "@/interface/ChatRoom.interface";
import { initialState } from "@/slices/chatSlice";

const ChatRoomMain = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const userId = Number(localStorage.getItem("userId"));

  const [chatroomInfo, setChatroomInfo] = useState<ChatRoomInfoConfig>(initialState.chatroomInfo);
  const [chatList, setChatList] = useState<ChatCommentConfig[]>([]);
  const [comment, setComment] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  const handleBack = () => {
    navigate("/home");
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || comment === "") return;
    writeChatComment();
  };

  const sendFireComment = async () => {
    const res = await postFireComment(id!);
    if (res === "이미 누르셨습니다.") setModalOpen(true);
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
      <Header
        title={chatroomInfo.toonName}
        before={handleBack}
        button={<Badge label={`🔥 ${chatroomInfo.fireTotalCount}`} sizes="small" types="primary" />}
      />
      <CustomAccordion info={chatroomInfo} />
      <div className={styles.main}>
        <div className={styles.main__chat}>
          <div className={styles.chat__list}>
            {chatList.map((chat, i) => {
              return chat.memberId === userId ? (
                <ChatItem
                  key={i}
                  mine={true}
                  memberId={chat.memberId}
                  nickname={chat.memberNickname}
                  profileImg={chat.memberImage}
                  time={chat.createdAt}
                  contents={chat.chatMessage}
                />
              ) : (
                <ChatItem
                  key={i}
                  mine={false}
                  memberId={chat.memberId}
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
              inputChange={(e) => setComment(e.target.value)}
              placeHolder="내용을 입력해주세요."
              colors="white"
              onSubmit={sendFireComment}
              messageBtn={writeChatComment}
              onKeyDown={handleEnter}
            />
          </div>
        </div>
      </div>
      {modalOpen && (
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onClick={() => setModalOpen(false)}
          btnTitle="확인"
          title={
            <div className={styles.text}>
              <Text types="title" bold="semi-bold">
                이미 참여하셨습니다.
              </Text>
            </div>
          }
        />
      )}
    </>
  );
};

export default ChatRoomMain;
