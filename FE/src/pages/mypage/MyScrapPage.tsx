import { getonMyScrap } from "@/api/myPage";
import Header from "@/components/common/Header";
import Input from "@/components/common/Input";
import FeedItem from "@/components/home/feed/FeedItem";
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
        console.error("Failed to fetch scrap list", error);
      }
    };
    fetchData();
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
      <div style={{ width: "340px", margin: "30px 0" }}>
        <Input
          value={searchQuery}
          types="search"
          placeholder="검색어로 빠르게 스크랩한 글 찾기"
          onChange={onSearchQueryChange}
        />
        {scrapList.length !== 0 ? (
          scrapList.filter((scrap) => scrap.feedTitle.includes(searchQuery)).map((scrap) => <FeedItem feed={scrap} />)
        ) : (
          <div>스크랩이 없어요</div>
        )}
      </div>
    </div>
  );
};

export default MyScrapPage;
