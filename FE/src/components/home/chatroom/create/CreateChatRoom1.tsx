import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "@styles/home/ChatRoom.module.scss";
import Header from "@components/common/Header";
import Text from "@/components/common/Text";
import Input from "@/components/common/Input";
import SearchedWebtoonCard from "@/components/Webtoon/SearchedWebtoonCard";
import Modal from "@/components/common/Modal";

const CreateChatRoom1 = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <>
      <Header title="방 만들기" before={handleBack} />
      <div className={styles.first}>
        <div>
          <Text types="sub-header" bold="semi-bold">
            어떤 웹툰에 대해 이야기할까요?
          </Text>
        </div>
        <Input types="search" placeholder="웹툰 제목을 입력하세요." />
        <div className={styles.webtoon}>
          <SearchedWebtoonCard
            title="웹툰 제목"
            imgUrl=""
            clicked={false}
            onClick={() => navigate("/chatroom/create/2")}
          />
          <SearchedWebtoonCard title="웹툰 제목" imgUrl="" clicked={false} onClick={() => setOpen(true)} />
          <SearchedWebtoonCard title="웹툰 제목" imgUrl="" clicked={false} onClick={() => console.log("dd")} />
          <SearchedWebtoonCard title="웹툰 제목" imgUrl="" clicked={false} onClick={() => console.log("dd")} />
        </div>
      </div>
      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title={
            <div className={styles.text}>
              <Text types="title" bold="semi-bold">
                이 방은 이미 존재해요.
              </Text>
              <Text types="title" bold="semi-bold">
                참여하러 갈까요?
              </Text>
            </div>
          }
          onClick={() => navigate("/chatroom/1")}
        />
      )}
    </>
  );
};

export default CreateChatRoom1;
