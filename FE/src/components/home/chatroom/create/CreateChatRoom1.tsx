import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "@styles/home/ChatRoom.module.scss";
import Header from "@components/common/Header";
import Text from "@/components/common/Text";
import Input from "@/components/common/Input";
import SearchedWebtoonCard from "@/components/Webtoon/SearchedWebtoonCard";
import Modal from "@/components/common/Modal";
import { WebtoonConfig } from "@/interface/Webtoon.interface";
import { useChatActions } from "@/slices/chatSlice";
import fetchWetboonInfo from "@/api/fetchWetboonInfo";

const CreateChatRoom1 = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [webtoonList, setWebtoonList] = useState<WebtoonConfig[]>([]);
  const { setSelected } = useChatActions();

  const setSelectedWebtoon = (webtoon: WebtoonConfig) => {
    setSelected(webtoon);
    navigate("/chatroom/create/2");
  };

  useEffect(() => {
    const getWebtoonList = async () => {
      try {
        const res = await fetchWetboonInfo(keyword);
        setWebtoonList(res);
      } catch (e) {
        console.error(e);
      }
    };

    if (keyword.length > 0) getWebtoonList();
    setWebtoonList([]);
  }, [keyword]);

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
        <Input
          types="search"
          placeholder="웹툰 제목, 웹툰 작가를 입력하세요."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className={styles.webtoon}>
          {webtoonList.map((webtoon, i) => {
            return (
              <SearchedWebtoonCard
                key={i}
                title={webtoon.title}
                imgUrl={webtoon.img}
                clicked={false}
                onClick={() => setSelectedWebtoon(webtoon)}
              />
            );
          })}
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
