import styles from "@styles/home/Home.module.scss";
import FeedItem from "@/components/home/feed/FeedItem";
import CreateButton from "@components/common/Button/Create";
import Banner from "@assets/images/home/banner2.svg?react";
import useFeedQuery from "@/api/reactQuery/useFeedQuery";
import { FeedListConfig } from "@/interface/Feed.interface";

const FeedPage = () => {
  const { feedListState, feedListLoading, feedListError } = useFeedQuery();
  if (feedListError) return <div>전체 피드 리스트 불러오기 실패</div>;
  if (feedListLoading) return <div>피드 불러오는중</div>;
  return (
    <>
      <Banner />
      <div className={styles.feed}>
        {feedListState &&
          feedListState.map((feed: FeedListConfig, i: number) => {
            return <FeedItem key={i} feed={feed} />;
          })}
        <CreateButton />
      </div>
    </>
  );
};

export default FeedPage;
