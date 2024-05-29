import Text from "@/components/common/Text";
import styles from "@/styles/signup/Signup.module.scss";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SelectedWebtoonBox from "@/components/Webtoon/SelectedWebtoonBox";
import SearchWebtoonContainer from "@/components/Webtoon/SearchWebtoonBox";
import { UserWebtoonListConfig, WebtoonConfig } from "@/interface/Webtoon.interface";
import { useUserStore } from "@/slices/useStore";
import Header from "@/components/common/Header";
import fetchWetboonInfo from "@/api/fetchWetboonInfo";
import { getOnMyData, updateUserData } from "@/api/myPage";

const EditSeeWtnPage = () => {
  const [search, setSearch] = useState<string>("");
  const [webtoons, setWebtoons] = useState<WebtoonConfig[]>([]);
  const { user, addSeeWebtoon, removeSeeWebtoon, resetSeeWebtoon } = useUserStore();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSelect = (webtoon: WebtoonConfig) => {
    if (user.seeWebttonList.length >= 4) {
      alert("최대 4개의 웹툰만 선택할 수 있습니다.");
      return;
    }

    if (!user.seeWebttonList.some((item) => item.title === webtoon.title)) {
      addSeeWebtoon(webtoon);
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
        (res.watchingToons as UserWebtoonListConfig[]).map((item) => {
          addSeeWebtoon({
            title: item.title,
            url: item.siteUrl,
            imageUrl: item.imageUrl,
            fanCount: item.rating,
            updateDays: item.days,
          });
        });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getWebtoonData = async () => {
      const res = await fetchWetboonInfo(search);
      setWebtoons(res);
      console.log("웹툰 리스트", res);
    };
    getWebtoonData();
  }, [search]);

  const removeSelect = (webtoon: WebtoonConfig) => {
    removeSeeWebtoon(webtoon);
  };

  const navigator = useNavigate();

  const goNext = async () => {
    if (user.seeWebttonList.length === 0) {
      alert("보고있는 웹툰을 1개 이상 추가해주세요");
      return;
    }
    await updateUserData({ watchingToons: user.seeWebttonList });
    console.log("서버에 수정한 웹툰 등록", user.seeWebttonList);
    resetSeeWebtoon();
    cancle();
  };
  const cancle = () => {
    resetSeeWebtoon();
    navigator("/mypage");
  };

  return (
    <>
      <Header title="내가 보는 웹툰" before beforeClick={cancle} />
      <div className={styles.container}>
        <Text types="headline" bold="bold">
          어떤 웹툰을 추가할까요?
        </Text>
        <SelectedWebtoonBox selectedList={user.seeWebttonList} removeSelect={removeSelect} />
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
