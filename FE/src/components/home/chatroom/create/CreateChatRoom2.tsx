import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import styles from "@styles/home/ChatRoom.module.scss";
import Header from "@components/common/Header";
import Text from "@components/common/Text";
import SearchedWebtoonCard from "@components/Webtoon/SearchedWebtoonCard";
import TextArea from "@components/common/TextArea";
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import { postChatRoom } from "@api/chat";
import { useChatActions, useChatStore } from "@slices/chatSlice";

const CreateChatRoom2 = () => {
  const navigate = useNavigate();
  const [selected, chatroomInfo] = useChatStore(useShallow((state) => [state.selected, state.chatroomInfo]));
  const [description, setDescription] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { setChatRoomInfo } = useChatActions();

  const createChatRoom = async () => {
    const data = {
      toonName: selected.title,
      toonImage: selected.imageUrl,
      toonUrl: selected.url,
      fanCounts: selected.rating,
      updateDay: selected.updateDays,
      contexts: description,
    };
    const res = await postChatRoom(data);
    setChatRoomInfo(res);
    setModalOpen(true);
  };

  const handleBack = () => {
    navigate("/chatroom/create/1");
  };

  return (
    <>
      <Header title="방 만들기" before beforeClick={handleBack} />
      <div className={styles.second}>
        <div>
          <SearchedWebtoonCard title={selected.title} imgUrl={selected.imageUrl} clicked={false} />
          <div>
            <Text types="title" bold="semi-bold">
              간단한 소개글을 입력해주세요. (선택)
            </Text>
            <TextArea
              placeholder="소개글을 입력해주세요."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Button onClick={createChatRoom}>방 만들기</Button>
        </div>
      </div>
      {modalOpen && (
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onClick={() => navigate(`/chatroom/${chatroomInfo.chatRoomId}`)}
          btnTitle="참여하기"
          title={
            <div className={styles.text}>
              <Text types="title" bold="semi-bold">
                새로운 채팅방이 생성되었습니다 !
              </Text>
            </div>
          }
        />
      )}
    </>
  );
};

export default CreateChatRoom2;
