import styles from "@styles/home/ChatRoom.module.scss";
import Header from "@components/common/Header";
import Text from "@/components/common/Text";
import SearchedWebtoonCard from "@/components/Webtoon/SearchedWebtoonCard";
import TextArea from "@/components/common/TextArea";
import Button from "@/components/common/Button";
import { useNavigate } from "react-router-dom";

const CreateChatRoom2 = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/chatroom/create/1");
  };
  return (
    <>
      <Header title="방 만들기" before={handleBack} />
      <div className={styles.second}>
        <div>
          <SearchedWebtoonCard title="웹툰 제목" imgUrl="" clicked={false} onClick={() => console.log("dd")} />
          <div>
            <Text types="title" bold="semi-bold">
              간단한 소개글을 입력해주세요. (선택)
            </Text>
            <TextArea placeholder="소개글을 입력해주세요." />
          </div>
        </div>
        <div>
          <Button onClick={() => navigate("/chatroom/1")}>방 만들기</Button>
        </div>
      </div>
    </>
  );
};

export default CreateChatRoom2;
