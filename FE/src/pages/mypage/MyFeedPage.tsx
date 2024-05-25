import Header from "@/components/common/Header";
import Input from "@/components/common/Input";
import FeedItem from "@/components/home/feed/FeedItem";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyFeedPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const goMypage = () => {
    navigate("/mypage");
  };

  const onSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const dummy = [1, 2, 3, 4];
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
      <Header title="내가 작성한 Feed" before={goMypage} />
      <div style={{ width: "310px", margin: "30px 0" }}>
        <Input
          value={searchQuery}
          types="search"
          placeholder="검색어로 빠르게 스크랩한 글 찾기"
          onChange={onSearchQueryChange}
        />
      </div>
      {dummy.map((item, index) => {
        return <FeedItem key={index} imgCount={item} />;
      })}
    </div>
  );
};

export default MyFeedPage;
