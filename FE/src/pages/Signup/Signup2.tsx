import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useUserStore } from "@/slices/useStore";
import useDebounce from "@/hooks/useDebounce";
import fetchWetboonInfo from "@/api/fetchWetboonInfo";
import { UserWebtoonListConfig } from "@/interface/Webtoon.interface";
import Text from "@/components/common/Text";
import SelectedWebtoonBox from "@/components/Webtoon/SelectedWebtoonBox";
import SearchWebtoonContainer from "@/components/Webtoon/SearchWebtoonBox";
import { ERROR_MESSAGE } from "@/constants/ErrorTypes";
import styles from "@/styles/signup/Signup.module.scss";

const Signup2 = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const debounced = useDebounce(search, 300);
  const [serchedWebtoons, setFetchWebtoons] = useState<UserWebtoonListConfig[]>([]);
  const { user, addSeeWebtoon, removeSeeWebtoon } = useUserStore();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchWebtoons = async () => {
      try {
        const response = await fetchWetboonInfo(debounced);
        setFetchWebtoons(response);
      } catch (e) {
        console.error("오류 발생", e);
      }
    };
    fetchWebtoons();
  }, [debounced]);

  const handleSelect = (webtoon: UserWebtoonListConfig) => {
    if (user.watchingToons.length >= 4) {
      alert(ERROR_MESSAGE.MAX_SELECTION_ERROR);
      return;
    }

    if (!user.watchingToons.some((item) => item.title === webtoon.title)) {
      addSeeWebtoon(webtoon);
      setSearch("");
    } else {
      alert(ERROR_MESSAGE.ALREADY_SELECTED_ERROR);
    }
  };

  const removeSelect = (webtoon: UserWebtoonListConfig) => {
    removeSeeWebtoon(webtoon);
  };

  const goNext = () => {
    if (user.watchingToons.length === 0) alert(ERROR_MESSAGE.MIN_SELECTION_ERROR);
    else {
      navigate("/signup/3");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Text types="headline" bold="bold">
          반가워요!
          <br />
          어떤 웹툰을 보고있나요?
        </Text>
        <SelectedWebtoonBox selectedList={user.watchingToons} removeSelect={removeSelect} />
      </div>
      <SearchWebtoonContainer
        webtoonTitle={search}
        webToonList={serchedWebtoons}
        onChange={onChange}
        handleSelect={handleSelect}
        height={58}
      />
      <button className={styles.confirm} onClick={goNext}>
        확인
      </button>
    </>
  );
};

export default Signup2;
