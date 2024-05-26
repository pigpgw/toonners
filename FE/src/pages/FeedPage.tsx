import styles from "@styles/home/Home.module.scss";
import FeedItem from "@/components/home/feed/FeedItem";
import CreateButton from "@components/common/Button/Create";
import Banner from "@assets/images/home/banner2.svg?react";
import { useEffect, useState } from "react";
import { getFeedList } from "@/api/feed";

const FeedPage = () => {
  const [feedList, setFeedList] = useState([]);
  useEffect(() => {
    const getFeedItems = async () => {
      const res = await getFeedList();
      setFeedList(res);
    };
    getFeedItems();
  }, []);
  return (
    <>
      <Banner />
      <div className={styles.feed}>
        {feedList.map((feed, i) => {
          return <FeedItem key={i} feed={feed} />;
        })}
        <CreateButton />
      </div>
    </>
  );
};

export default FeedPage;
