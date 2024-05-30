import { getonMyFeed } from "@/api/myPage";
import Header from "@/components/common/Header";
import Input from "@/components/common/Input";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FeedItem from "@/components/home/feed/FeedItem";
import { FeedListConfig } from "@/interface/Feed.interface";

const MyFeedPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  const [feedList, setFeedList] = useState<FeedListConfig[]>([]);

  const goMypage = () => {
    navigate("/mypage");
  };

  const onSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const fe = async () => {
      const res = await getonMyFeed();
      console.log(res);
      if (res) {
        setFeedList(res as FeedListConfig[]);
      } else {
        setFeedList([]);
      }
    };
    fe();
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
      <Header title="내가 작성한 피드" before beforeClick={goMypage} />
      <div style={{ width: "340px", margin: "30px 0" }}>
        <Input
          value={searchQuery}
          types="search"
          placeholder="검색어로 빠르게 스크랩한 글 찾기"
          onChange={onSearchQueryChange}
        />
        {feedList.length !== 0 ? (
          feedList.filter((feed) => feed.feedTitle.includes(searchQuery)).map((feed) => <FeedItem feed={feed} />)
        ) : (
          <div>피드가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default MyFeedPage;
