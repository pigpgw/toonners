import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Text from "@/components/common/Text";
import Input from "@/components/common/Input";
import Header from "@/components/common/Header";
import FeedItem from "@/components/home/feed/FeedItem";
import { FEED_SCRAP_TYPES } from "@/constants/ComponentTypes";
import styles from "@styles/mypage/Mypage.module.scss";
import { ERROR_MESSAGE } from "@/constants/ErrorTypes";
import useFetchMyList from "@/hooks/useFetchMyList";
import useSearchQuery from "@/hooks/useSearchQuery";

interface Props {
  type: string;
}

const FeedScrapPanel = ({ type }: Props) => {
  const navigate = useNavigate();
  const isScrapType = type === FEED_SCRAP_TYPES.Scrap;
  const [searchQuery, onSearchQueryChange] = useSearchQuery();
  const goMypage = useCallback(() => {
    navigate("/mypage");
  }, [navigate]);
  const feedList = useFetchMyList({ isScrapType, goSomeWhere: goMypage });

  return (
    <div className={styles.panelWrapper}>
      <Header title={isScrapType ? "내 스크랩 목록" : "내가 작성한 피드"} before beforeClick={goMypage} />
      <div className={styles.contentWrapper}>
        <Input
          value={searchQuery as string}
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
              {isScrapType ? ERROR_MESSAGE.NO_SCRAPPED_MY_FEEDS : ERROR_MESSAGE.NO_AUTHORED_MY_FEEDS}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedScrapPanel;
