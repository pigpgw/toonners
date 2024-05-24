import styles from "@styles/home/ChatRoom.module.scss";
import Header from "@components/common/Header";
import Text from "@/components/common/Text";
import SearchedWebtoonCard from "@/components/Webtoon/SearchedWebtoonCard";
import TextArea from "@/components/common/TextArea";
import Button from "@/components/common/Button";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "@/slices/chatSlice";
import { useState } from "react";

const CreateChatRoom2 = () => {
  const navigate = useNavigate();
  const selected = useChatStore((state) => state.selected);
  const [description, setDescription] = useState("");

  const createChatRoom = () => {
    console.log(selected);
    console.log(description);
    navigate("/chatroom/1");
  };

  const handleBack = () => {
    navigate("/chatroom/create/1");
  };

  return (
    <>
      <Header title="방 만들기" before={handleBack} />
      <div className={styles.second}>
        <div>
          <SearchedWebtoonCard title={selected.title} imgUrl={selected.img} clicked={false} />
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
    </>
  );
};

export default CreateChatRoom2;
