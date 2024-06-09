import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "@styles/home/ChatRoom.module.scss";
import Header from "@components/common/Header";
import Text from "@/components/common/Text";
import Input from "@/components/common/Input";
import SearchedWebtoonCard from "@/components/Webtoon/SearchedWebtoonCard";
import Modal from "@/components/common/Modal";
import { UserWebtoonListConfig } from "@/interface/Webtoon.interface";
import { useChatActions } from "@/slices/chatSlice";
import fetchWetboonInfo from "@/api/fetchWetboonInfo";
import { getIsExist } from "@/api/chat";

const CreateChatRoom1 = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isExist, setIsExist] = useState(0);
  const [webtoonList, setWebtoonList] = useState<UserWebtoonListConfig[]>([]);
  const { setSelected } = useChatActions();

  const checkIsExist = async (webtoon: UserWebtoonListConfig) => {
    const res = await getIsExist(webtoon.title);
    if (res !== -1) {
      setIsExist(res);
      setOpen(true);
      return;
    } else {
      setSelected(webtoon);
      navigate("/chatroom/create/2");
    }
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
      <Header title="방 만들기" before beforeClick={handleBack} />
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
                imgUrl={webtoon.imageUrl}
                clicked={false}
                onClick={() => checkIsExist(webtoon)}
              />
            );
          })}
        </div>
      </div>
      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          btnTitle="참여하기"
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
          onClick={() => navigate(`/chatroom/${isExist}`)}
        />
      )}
    </>
  );
};

export default CreateChatRoom1;
