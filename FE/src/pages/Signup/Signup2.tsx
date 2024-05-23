import Text from "@/components/common/Text";
import styles from "@/styles/signup/Signup2.module.scss";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import Input from "../../components/common/Input/index";
import SearchedWebtoonCard from "@/components/Webtoon/SearchedWebtoonCard";
import fetchWetboonInfo from "@/api/fetchWetboonInfo";
import SearchedWebtoonContainer from "@/components/Webtoon/SearchedWebtoonContainer";

type Webtoon = {
  title: string;
  url: string;
  img: string;
  updateDays: string[];
  fanCount: number;
};

const Signup2 = () => {
  const [search, setSearch] = useState<string>("");
  const [webtoons, setWebtoons] = useState<Webtoon[]>([]);
  const [select, setSelect] = useState<Webtoon[]>([]);
  const lastSelectedWebtoonRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (lastSelectedWebtoonRef.current) {
      lastSelectedWebtoonRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [select]);

  const handleSelect = (webtoon: Webtoon) => {
    if (!select?.some((item) => item.title === webtoon.title)) {
      setSelect((prevSelect) => [...prevSelect, webtoon]);
      setSearch("");
    } else {
      alert("이미 있습니다.");
    }
  };

  const removeSelect = (webtoon: Webtoon) => {
    setSelect((prevSelect) => prevSelect.filter((item) => item.title !== webtoon.title));
  };

  const navigator = useNavigate();

  const goNext = () => {
    if (select.length === 0) alert("보고있는 웹툰을 1개 이상 추가해주세요");
    else navigator("/signup/3");
  };

  return (
    <div className={styles.container}>
      <Text types="headline" bold="bold">
        반가워요!
        <br />
        어떤 웹툰을 보고있나요?
      </Text>
      <SearchedWebtoonContainer selectedList={select} removeSelect={removeSelect} lastSelectedWebtoonRef={lastSelectedWebtoonRef}> 

      </SearchedWebtoonContainer>
      <div className={styles.searchBox}>
        <div className={styles.searchInputBox}>
          <Input value={search} placeholder="검색어 입력" types="search" onChange={onChange} />
          <div className={styles.searchedWebtoonContainer}>
            {webtoons?.map((webtoon, index) => (
              <SearchedWebtoonCard
                key={`${index}_li`}
                title={webtoon.title}
                imgUrl={webtoon.img}
                clicked={false}
                onClick={() => {
                  handleSelect(webtoon);
                }}
              ></SearchedWebtoonCard>
            ))}
          </div>
        </div>
      </div>
      <button className={styles.confirm} onClick={goNext}>
        확인
      </button>
    </div>
  );
};

export default Signup2;
