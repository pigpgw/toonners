import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/slices/useStore";
import useDebounce from "@/hooks/useDebounce";
import fetchWetboonInfo from "@/api/fetchWetboonInfo";
import { getOnMyData, updateUserData } from "@/api/myPage";
import { UserWebtoonListConfig } from "@/interface/Webtoon.interface";
import Text from "@/components/common/Text";
import Header from "@/components/common/Header";
import SelectedWebtoonBox from "@/components/Webtoon/SelectedWebtoonBox";
import SearchWebtoonContainer from "@/components/Webtoon/SearchWebtoonBox";
import { ERROR_MESSAGE } from "@/constants/ErrorTypes";
import { EDIT_MY_WEBTOON_TYPES } from "@/constants/ComponentTypes";
import styles from "@/styles/signup/Signup.module.scss";

const EditMyWebtoonFrame = ({ type }: { type: string }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const debounced = useDebounce(search,300)
  const [webtoons, setWebtoons] = useState<UserWebtoonListConfig[]>([]);
  const {
    user,
    addSeeWebtoon,
    addFavoriteToons,
    removeFavoriteToons,
    resetSeeWebtoon,
    resetFavoriteToons,
    removeSeeWebtoon,
  } = useUserStore();
  const isLikedType = type === EDIT_MY_WEBTOON_TYPES.Like;
  const userWebtoonList = isLikedType ? user.favoriteToons : user.watchingToons;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSelect = (webtoon: UserWebtoonListConfig) => {
    if (userWebtoonList.length >= 4) {
      alert(ERROR_MESSAGE.MAX_SELECTION_ERROR);
      return;
    }

    if (!userWebtoonList.some((item) => item.title === webtoon.title)) {
      isLikedType ? addFavoriteToons(webtoon) : addSeeWebtoon(webtoon);
      setSearch("");
    } else {
      alert(ERROR_MESSAGE.ALREADY_SELECTED_ERROR);
    }
  };

  useEffect(() => {
    resetFavoriteToons();
    resetSeeWebtoon();
    const fetchData = async () => {
      try {
        const res = await getOnMyData();
        if (res) {
          const webtoonsToAdd = isLikedType ? res.favoriteToons : res.watchingToons;
          webtoonsToAdd.forEach((item) => {
            const webtoon = {
              title: item.title,
              url: item.url,
              imageUrl: item.imageUrl,
              rating: item.rating,
              updateDays: item.updateDays,
            };
            isLikedType ? addFavoriteToons(webtoon) : addSeeWebtoon(webtoon);
          });
        }
      } catch (e) {
        alert(`내${isLikedType ? " 인생" : "가보는"} 웹툰 데이터를 가져오는데 실패했습니다.`);
        navigate("/");
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getWebtoonData = async () => {
      console.log(debounced)
      const res = await fetchWetboonInfo(debounced);
      setWebtoons(res);
    };
    getWebtoonData();
  }, [debounced]);

  const removeSelect = (webtoon: UserWebtoonListConfig) => {
    isLikedType ? removeFavoriteToons(webtoon) : removeSeeWebtoon(webtoon);
  };

  const goNext = async () => {
    if (userWebtoonList.length === 0) {
      alert(ERROR_MESSAGE.MIN_SELECTION_ERROR);
      return;
    }
    try {
      const dataToUpdate = isLikedType ? { favoriteToons: userWebtoonList } : { watchingToons: userWebtoonList };
      await updateUserData(dataToUpdate);
      cancle();
    } catch (e) {
      alert(ERROR_MESSAGE.UPDATE_ERROR);
      cancle();
    }
  };

  const cancle = () => {
    navigate("/mypage");
  };

  return (
    <>
      <Header title={isLikedType ? "내 인생 웹툰" : "내가 보는 웹툰"} before beforeClick={cancle} />
      <div className={styles.container}>
        <Text types="headline" bold="bold">
          어떤 웹툰을 추가할까요?
        </Text>
        <SelectedWebtoonBox
          selectedList={isLikedType ? user.favoriteToons : user.watchingToons}
          removeSelect={removeSelect}
        />
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

export default EditMyWebtoonFrame;
