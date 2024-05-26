import Text from "@/components/common/Text";
import styles from "@/styles/signup/Signup.module.scss";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import fetchWetboonInfo from "@/api/fetchWetboonInfo";
import SelectedWebtoonBox from "@/components/Webtoon/SelectedWebtoonBox";
import SearchWebtoonContainer from "@/components/Webtoon/SearchWebtoonBox";
import { WebtoonConfig } from "@/interface/Webtoon.interface";
import { useUserStore } from "@/slices/useStore";
import Header from "@/components/common/Header";
import { updateUserData } from "@/api/myPage";

const EditLikedWtnPage = () => {
  const [search, setSearch] = useState<string>("");
  const [webtoons, setWebtoons] = useState<WebtoonConfig[]>([]);
  const { user, addLikedWebToonList, removeLikedWebToonList } = useUserStore();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchWebtoons = async () => {
      try {
        const response = await fetchWetboonInfo(search);
        setWebtoons(response);
      } catch (e) {
        console.error("오류 발생", e);
      }
    };
    if (search) fetchWebtoons();
    else setWebtoons([]);
  }, [search]);

  const handleSelect = (webtoon: WebtoonConfig) => {
    if (user.likedWebToonList.length >= 4) {
      alert("최대 4개의 웹툰만 선택할 수 있습니다.");
      return;
    }

    if (!user.likedWebToonList.some((item) => item.title === webtoon.title)) {
      addLikedWebToonList(webtoon);
      setSearch("");
    } else {
      alert("이미 선택된 웹툰입니다.");
    }
  };

  const removeSelect = (webtoon: WebtoonConfig) => {
    removeLikedWebToonList(webtoon);
  };

  const navigator = useNavigate();

  const goNext = async () => {
    if (user.likedWebToonList.length === 0) {
      alert("보고있는 웹툰을 1개 이상 추가해주세요");
      return;
    }
    try {
      const data = {
        watchingToons: webtoons.map((toon) => ({
          title: toon.title,
          imageUrl: toon.imageUrl,
          days: toon.updateDays,
        })),
      };
      await updateUserData(data);
      console.log(user);
      navigator("/mypage");
    } catch (e) {
      alert("잠시 오류가 발생했어요!");
      navigator("/mypage");
    }
  };

  const cancle = () => {
    navigator("/mypage");
  };

  return (
    <>
      <Header title="인생 웹툰" before={cancle} />
      <div className={styles.container}>
        <Text types="headline" bold="bold">
          어떤 웹툰을 추가할까요?
        </Text>
        <SelectedWebtoonBox selectedList={user.likedWebToonList} removeSelect={removeSelect} />
      </div>
      <SearchWebtoonContainer
        webtoonTitle={search}
        webToonList={webtoons}
        onChange={onChange}
        handleSelect={handleSelect}
        height={65}
      />
      <button className={styles.confirm} onClick={goNext}>
        확인
      </button>
    </>
  );
};

export default EditLikedWtnPage;
