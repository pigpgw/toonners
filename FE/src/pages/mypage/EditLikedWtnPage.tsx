import Text from "@/components/common/Text";
import styles from "@/styles/signup/Signup.module.scss";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SelectedWebtoonBox from "@/components/Webtoon/SelectedWebtoonBox";
import SearchWebtoonContainer from "@/components/Webtoon/SearchWebtoonBox";
import { WebtoonConfig } from "@/interface/Webtoon.interface";
import { useUserStore } from "@/slices/useStore";
import Header from "@/components/common/Header";
import fetchWetboonInfo from "@/api/fetchWetboonInfo";
import { getOnMyData, updateUserData } from "@/api/myPage";

const EditSeeWtnPage = () => {
  const [search, setSearch] = useState<string>("");
  const [webtoons, setWebtoons] = useState<WebtoonConfig[]>([]);
  const { user, addLikedWebToonList, removeLikedWebToonList, resetLikedWebtoon } = useUserStore();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      const res = await getOnMyData();
      if (res) {
        console.log(res);
        // setFetchUserData(res);
        res.favoriteToons.map(function (item) {
          addLikedWebToonList(item);
        });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getWebtoonData = async () => {
      const res = await fetchWetboonInfo(search);
      setWebtoons(res);
    };
    getWebtoonData();
  }, [search]);

  const removeSelect = (webtoon: WebtoonConfig) => {
    removeLikedWebToonList(webtoon);
  };

  const navigator = useNavigate();

  const goNext = async () => {
    if (user.likedWebToonList.length === 0) {
      alert("보고있는 웹툰을 1개 이상 추가해주세요");
      return;
    }
    await updateUserData({ favoriteToons: user.likedWebToonList });
    console.log("서버에 수정한 웹툰 등록", user.likedWebToonList);
    resetLikedWebtoon();
    cancle();
  };
  const cancle = () => {
    resetLikedWebtoon();
    navigator("/mypage");
  };

  return (
    <>
      <Header title="내가 보는 웹툰" before beforeClick={cancle} />
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
        height={55}
      />
      <button className={styles.confirm} onClick={goNext}>
        확인
      </button>
    </>
  );
};

export default EditSeeWtnPage;
