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
      try {
        const res = await getonMyFeed();
        if (res) {
          setFeedList(res as FeedListConfig[]);
        } else {
          setFeedList([]);
        }
      } catch (e) {
        alert("내가 작성한 피드 불러오기 실패");
        goMypage();
      }
    };
    fe();
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
      <Header title="내가 작성한 피드" before beforeClick={goMypage} />
      <div style={{ width: "350px", margin: "30px 0" }}>
        <Input
          value={searchQuery}
          types="search"
          placeholder="검색어로 빠르게 스크랩한 글 찾기"
          onChange={onSearchQueryChange}
        />
        {feedList.length !== 0 ? (
          feedList
            .filter((feed) => feed.feedTitle.includes(searchQuery))
            .map((feed) => (
              <div style={{ margin: "10px 0" }} key={feed.parentFeedId}>
                <FeedItem feed={feed} />
              </div>
            ))
        ) : (
          <div key="no-feed">피드가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default MyFeedPage;
