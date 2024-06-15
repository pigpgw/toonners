import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { putUserFeed } from "@/api/feed";
import { deleteFeed } from "@/api/feed";
import { postNewRecommend } from "@/api/recommend";
import { useRecommendConfigStore, useRecommendationStore } from "@/slices/useRecommendationStore";
import Input from "../../components/common/Input/index";
import Text from "@/components/common/Text";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button/index";
import Header from "@/components/common/Header";
import AddButton from "@/components/newRecommend/Button";
import WebtoonCard from "@/components/newRecommend/WebtoonCard";
import DeleteButton from "@/components/common/Button/delete";
import styles from "@/styles/makeRecommend/makeRecommend.module.scss";

const Step1 = () => {
  const { recommendationData, setPostTitle, setPostcotexts, removeRecommendation, resetRecommendationData } =
    useRecommendationStore();
  const { resetRecommendConfig } = useRecommendConfigStore();
  const [deleteModal, setDeleteModal] = useState(false);
  const [modify, setModify] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const clickShareBtn = async () => {
    if (recommendationData.title.length === 0) {
      alert("추천글 제목을 입력해주세요");
      return;
    }
    if (recommendationData.recommendToons.length === 0) {
      alert("웹툰 1가지 이상 추천해주세요");
      return;
    }
    try {
      if (modify)
        await putUserFeed(recommendationData.parentFeedId!, {
          title: recommendationData.title,
          context: recommendationData.context,
          recommendToons: recommendationData.recommendToons,
        });
      else await postNewRecommend(recommendationData);
      resetRecommendationData();
      resetRecommendConfig();
      alert("등록이 완료되었습니다.!");
      navigate("/home");
    } catch (e) {
      alert(e);
    }
  };

  const navigate = useNavigate();

  const goNextPage = () => {
    navigate("/recommend/new/2");
  };

  const goHome = () => {
    resetRecommendationData();
    resetRecommendConfig();
    navigate("/home");
  };

  const inputTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostTitle(e.target.value);
  };

  const inputContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostcotexts(e.target.value);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [recommendationData?.recommendToons?.length]);

  useEffect(() => {
    if (recommendationData.parentFeedId) {
      setModify(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteWebtoon = (title: string) => {
    removeRecommendation(title);
  };

  const handleDeleteModal = async () => {
    setDeleteModal(!deleteModal);
  };

  const clickDeleteBtn = async () => {
    try {
      await deleteFeed(recommendationData.parentFeedId!);
      resetRecommendConfig();
      resetRecommendationData();
      navigate("/");
    } catch (e) {
      console.log("피드 삭제 실패", e);
    }
  };

  return (
    <>
      <Header
        title="웹툰 추천하기"
        before
        beforeClick={goHome}
        button={
          <Button types="primary" sizes="small" onClick={clickShareBtn}>
            <Text types="button" bold="medium">
              공유
            </Text>
          </Button>
        }
      />
      <div className={styles.inputcontainer}>
        <Input
          types="default"
          placeholder="제목을 입력하세요"
          colors="gray-1"
          value={recommendationData.title}
          onChange={inputTitleChange}
        />
        <textarea
          value={recommendationData.context}
          onChange={inputContentChange}
          className={styles.textarea}
          placeholder="내용을 입력하세요"
        />
        {recommendationData?.recommendToons?.map((item, index) => {
          return (
            <>
              <button
                className={styles.deleteBtn}
                onClick={() => {
                  deleteWebtoon(item.title);
                }}
              >
                X
              </button>
              <WebtoonCard
                key={`WebtoonCard_${index}`}
                title={item.title}
                score={item.starring}
                imgUrl={item.imageUrl}
                moodList={item.hashtagVibe}
                genreList={item.hashtagGenre}
              />
            </>
          );
        })}
        {deleteModal && (
          <Modal
            open={deleteModal}
            onClose={() => setDeleteModal(false)}
            onClick={clickDeleteBtn}
            title="피드를 삭제 하시겠습니까."
            btnTitle="삭제하기"
          />
        )}
        {recommendationData.recommendToons.length < 4 && <AddButton onClick={goNextPage} />}
        {modify && <DeleteButton onClick={handleDeleteModal}>피드 삭제하기</DeleteButton>}
        <div ref={scrollRef}></div>
      </div>
    </>
  );
};

export default Step1;
