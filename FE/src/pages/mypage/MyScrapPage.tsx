import styles from "@styles/mypage/Mypage.module.scss";
import { getonMyScrap } from "@/api/myPage";
import Header from "@/components/common/Header";
import Input from "@/components/common/Input";
import FeedItem from "@/components/home/feed/FeedItem";
import Text from "@/components/common/Text";
import { FeedListConfig } from "@/interface/Feed.interface";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyScrapPage = () => {
  const [scrapList, setScrapList] = useState<FeedListConfig[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const goMypage = () => {
    navigate("/mypage");
  };

  const onSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getonMyScrap();
        if (res) {
          setScrapList(res as FeedListConfig[]);
        } else {
          setScrapList([]);
        }
      } catch (error) {
        alert("내 스크랩 리스트 가져오기 실패");
        goMypage();
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        width: "393px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Header title="내 스크랩" before beforeClick={goMypage} />
      <div style={{ width: "350px", margin: "30px 0" }}>
        <Input
          value={searchQuery}
          types="search"
          placeholder="검색어로 빠르게 스크랩한 글 찾기"
          onChange={onSearchQueryChange}
        />
        {scrapList.length !== 0 ? (
          scrapList
            .filter((scrap) => scrap.feedTitle.includes(searchQuery))
            .map((scrap) => (
              <div style={{ margin: "10px 0" }} key={scrap.parentFeedId}>
                <FeedItem feed={scrap} />
              </div>
            ))
        ) : (
          <div className={styles.none}>
            <Text types="body-2">스크랩한 피드가 없습니다.</Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyScrapPage;
