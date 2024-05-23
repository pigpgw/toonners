import Text from "@/components/common/Text";
import styles from "@/styles/signup/Signup2.module.scss";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import Input from "../../components/common/Input/index";
import axios from "axios";
import SearchedWebtoonCard from "@/components/Webtoon/SearchedWebtoonCard";

type Webtoon = {
  _id: string;
  webtoonId: number;
  title: string;
  author: string;
  url: string;
  img: string;
  service: string;
  updateDays: string[];
  fanCount: number;
  searchKeyword: string;
  additional: {
    new: boolean;
    adult: boolean;
    rest: boolean;
    up: boolean;
    singularityList: unknown[];
  };
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
        const response = await axios.get(`https://korea-webtoon-api.herokuapp.com/search?keyword=${search}`);
        const webtoonsData = response.data.webtoons || [];
        const filteredWebtoons = webtoonsData.map((webtoon: Webtoon) => ({
          title: webtoon.title,
          url: webtoon.url,
          img: webtoon.img,
          updateDays: webtoon.updateDays,
          fanCount: webtoon.fanCount,
        }));
        setWebtoons(filteredWebtoons);
        console.log(response.data);
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
    console.log("고른거 서버에 전달?", select);
    navigator("/signup/3");
  };

  return (
    <div className={styles.container}>
      <Text types="headline" bold="bold">
        반가워요!
        <br />
        어떤 웹툰을 보고있나요?
      </Text>
      <div className={styles.selectedItemContainer}>
        {select.map((webtoon, index) => (
          <div key={`${index}_li`} ref={index === select.length - 1 ? lastSelectedWebtoonRef : null}>
            <SearchedWebtoonCard
              title={webtoon.title}
              imgUrl={webtoon.img}
              clicked={true}
              onClick={() => removeSelect(webtoon)}
            />
          </div>
        ))}
        {select.length < 4 ? <div className={styles.dummy}>+</div> : null}
      </div>
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
