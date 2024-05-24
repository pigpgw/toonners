import styles from "@styles/home/Home.module.scss";
import FeedItem from "@/components/home/feed/FeedItem";
import Banner from "@assets/images/home/banner2.svg?react";

const RecommendPage = () => {
  return (
    <>
      <Banner />
      <div className={styles.feed}>
        <FeedItem imgCount={1} />
        <FeedItem imgCount={2} />
        <FeedItem imgCount={3} />
        <FeedItem imgCount={4} />
      </div>
    </>
  );
};

export default RecommendPage;
