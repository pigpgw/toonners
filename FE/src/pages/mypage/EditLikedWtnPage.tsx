import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Text from "@/components/common/Text";
import Header from "@/components/common/Header";
import SelectedWebtoonBox from "@/components/Webtoon/SelectedWebtoonBox";
import SearchWebtoonContainer from "@/components/Webtoon/SearchWebtoonBox";
import { UserWebtoonListConfig } from "@/interface/Webtoon.interface";
import { useUserStore } from "@/slices/useStore";
import fetchWetboonInfo from "@/api/fetchWetboonInfo";
import { getOnMyData, updateUserData } from "@/api/myPage";
import styles from "@/styles/signup/Signup.module.scss";

const EditLikedWtnPage = () => {
  const [search, setSearch] = useState<string>("");
  const [query, setQuery] = useState("");
  const [webtoons, setWebtoons] = useState<UserWebtoonListConfig[]>([]);
  const { user, addFavoriteToons, removeFavoriteToons, resetFavoriteToons } = useUserStore();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSelect = (webtoon: UserWebtoonListConfig) => {
    if (user.favoriteToons.length >= 4) {
      alert("최대 4개의 웹툰만 선택할 수 있습니다.");
      return;
    }

    if (!user.favoriteToons.some((item) => item.title === webtoon.title)) {
      addFavoriteToons(webtoon);
      setSearch("");
    } else {
      alert("이미 선택된 웹툰입니다.");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    resetFavoriteToons();
    const fetchData = async () => {
      try {
        const res = await getOnMyData();
        if (res) {
          (res.favoriteToons as UserWebtoonListConfig[]).map((item) => {
            addFavoriteToons({
              title: item.title,
              url: item.url,
              imageUrl: item.imageUrl,
              rating: item.rating,
              updateDays: item.updateDays,
            });
          });
        }
      } catch (e) {
        alert("내 인생 웹툰 가져오기 실패");
        navigate("/");
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getWebtoonData = async () => {
      const res = await fetchWetboonInfo(query);
      setWebtoons(res);
    };
    getWebtoonData();
  }, [query]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQuery(search);
    }, 300);
    return () => clearTimeout(debounce);
  }, [search]);

  const removeSelect = (webtoon: UserWebtoonListConfig) => {
    removeFavoriteToons(webtoon);
  };

  const navigator = useNavigate();

  const goNext = async () => {
    if (user.favoriteToons.length === 0) {
      alert("보고있는 웹툰을 1개 이상 추가해주세요");
      return;
    }
    try {
      await updateUserData({ favoriteToons: user.favoriteToons });
      cancle();
    } catch (e) {
      alert("업데이트 실패");
      cancle();
    }
  };
  const cancle = () => {
    navigator("/mypage");
  };

  return (
    <>
      <Header title="내가 보는 웹툰" before beforeClick={cancle} />
      <div className={styles.container}>
        <Text types="headline" bold="bold">
          어떤 웹툰을 추가할까요?
        </Text>
        <SelectedWebtoonBox selectedList={user.favoriteToons} removeSelect={removeSelect} />
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

export default EditLikedWtnPage;
