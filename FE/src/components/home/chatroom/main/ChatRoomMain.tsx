/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postChatComment, postFireComment } from "@api/chat";
import { filterProfanity } from "@/utils/filterValue";
import Text from "@/components/common/Text";
import Modal from "@/components/common/Modal";
import Badge from "@/components/common/Badge";
import Header from "@components/common/Header";
import ChatItem from "@components/home/chatroom/main/ChatItem";
import InputWithButton from "@/components/common/InputWithButton";
import CustomAccordion from "./Accordian";
import styles from "@styles/home/ChatRoom.module.scss";
import { useFetchChatRoomInfo,useFetchChatMessages } from "@api/reactQuery/useChat"

const ChatRoomMain = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const userId = Number(localStorage.getItem("userId"));
  const [comment, setComment] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  const { chatMessagesState, chatMessagesRefetch } = useFetchChatMessages(id!);
  const { chatRoomInfoState } = useFetchChatRoomInfo(id!);

  const handleBack = () => {
    navigate("/home");
  };

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      writeChatComment();
    }
  };

  const sendFireComment = async () => {
    const res = await postFireComment(id!);
    if (res === "이미 누르셨습니다.") {
      setIsClicked(true);
    }
    setModalOpen(true);
  };

  const writeChatComment = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await postChatComment({
        chatRoomId: id!,
        contexts: filterProfanity(comment),
      });
      setComment("");
      chatMessagesRefetch();
    } catch (error) {
      console.error("채팅 메세지 제출 에러:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // 맨 처음 로딩 시 스크롤이 제일 하단에 위치.
    if (endRef.current) {
      endRef.current.scrollIntoView();
    }
  }, [chatMessagesState]);

  return (
    <>
      {chatRoomInfoState && (
        <>
          <Header
            title={chatRoomInfoState.toonName}
            before
            beforeClick={handleBack}
            button={
              <Badge
                label={`🔥 ${chatRoomInfoState.fireTotalCount === null ? 0 : chatRoomInfoState.fireTotalCount}`}
                sizes="small"
                types="primary"
              />
            }
          />
          <CustomAccordion info={chatRoomInfoState} />
        </>
      )}
      <div className={styles.main}>
        <div className={styles.main__chat}>
          <div className={styles.chat__list}>
            {chatMessagesState &&
              chatMessagesState.map((chat: any, i: number) => {
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
              {isClicked ? (
                <>
                  <Text types="title" bold="semi-bold">
                    이미 참여하셨습니다.
                  </Text>
                </>
              ) : (
                <>
                  <Text types="title" bold="semi-bold">
                    🔥 공감 버튼을 눌렀습니다.
                  </Text>
                </>
              )}
            </div>
          }
        />
      )}
    </>
  );
};

export default ChatRoomMain;
