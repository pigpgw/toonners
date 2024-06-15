import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getonMyFeed, getonMyScrap } from "@/api/myPage";
import { FeedListConfig } from "@/interface/Feed.interface";
import Text from "@/components/common/Text";
import Input from "@/components/common/Input";
import Header from "@/components/common/Header";
import FeedItem from "@/components/home/feed/FeedItem";
import styles from "@styles/mypage/Mypage.module.scss";

interface Props {
  type: string;
}

const FeedScrapPanel = ({ type }: Props) => {
  const [feedList, setFeedList] = useState<FeedListConfig[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const goMypage = useCallback(() => {
    navigate("/mypage");
  }, [navigate]);

  const onSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await (type === "scrap" ? getonMyScrap() : getonMyFeed());
        res ? setFeedList(res) : setFeedList([]);
        console.log('res',res)
      } catch (error) {
        alert(`내 ${type} 리스트 가져오기 실패`);
        goMypage();
      }
    };
    fetchData();
  }, [type, goMypage]);

  return (
    <div className={styles.panelWrapper}>
      <Header title={type === "scrap" ? "내 스크랩 목록" : "내가 작성한 피드"} before beforeClick={goMypage} />
      <div className={styles.contentWrapper}>
        <Input
          value={searchQuery}
          types="search"
          placeholder="검색어로 빠르게 스크랩한 글 찾기"
          onChange={onSearchQueryChange}
        />
        {feedList.length !== 0 ? (
          feedList
            .filter((scrap) => scrap.feedTitle.includes(searchQuery))
            .map((scrap) => (
              <div className={styles.itemWrapper} key={scrap.parentFeedId}>
                <FeedItem feed={scrap} />
              </div>
            ))
        ) : (
          <div className={styles.none}>
            <Text types="body-2">
              {type === "scrap" ? "스크랩한 피드가 없습니다." : "내가 작성한 피드가 없습니다."}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedScrapPanel;
