import { useFeedQuery } from "@/api/reactQuery/useFeed";
import { FeedListConfig } from "@/interface/Feed.interface";
import FeedItem from "@/components/home/feed/FeedItem";
import CreateButton from "@/components/home/chatroom/create/CreateButton";
import Loading from "./Loding";
import Banner from "@assets/images/home/banner2.svg?react";
import styles from "@styles/home/Home.module.scss";
import { useEffect } from "react";

const FeedPage = () => {
  const { feedListState, feedListError } = useFeedQuery();
  useEffect(() => {
    console.log('feedListState',feedListState)
  },[])
  return (
    <>
      <Banner />
      <div className={styles.feed}>
        {feedListError && <Loading comment="피드 리스트 불러오기 실패" />}
        {feedListState &&
          feedListState.map((feed: FeedListConfig, i: number) => {
            return <FeedItem key={i} feed={feed} />;
          })}
      </div>
      <CreateButton />
    </>
  );
};

export default FeedPage;
