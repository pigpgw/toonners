import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "@styles/home/Home.module.scss";
import Text from "@components/common/Text";
import Tag from "@components/common/Tag";
import Profile from "@components/common/Profile";
import { FeedListConfig } from "@/interface/Feed.interface";

interface Props {
  feed: FeedListConfig;
}

const FeedItem = ({ feed }: Props) => {
  const navigate = useNavigate();

  const handleFeedItem = () => {
    navigate(`/recommend/${feed.parentFeedId}`);
  };

  const handleProfile = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate(`/profile/${feed.writerMemberId}`);
  };

  return (
    <div className={styles.feed__item} onClick={handleFeedItem}>
      <div className={styles.feed__imgs}>
        {feed.childFeedList &&
          feed.childFeedList.length > 0 &&
          feed.childFeedList.map((child, i) => {
            return (
              <div key={i}>
                <img src={child.toonImage} />
              </div>
            );
          })}
      </div>
      <div className={styles.feed__info}>
        <div>
          <Text types="sub-header" bold="semi-bold">
            {feed.feedTitle}
          </Text>
          <Text>{feed.feedContexts}</Text>
        </div>
        <div className={styles.rest__tags}>
          {feed.hashtags.length > 0 &&
            feed.hashtags.map((tag, i) => {
              return <Tag key={i} label={`# ${tag}`} sizes="small" />;
            })}
        </div>
        <div className={styles.feed__profile}>
          <Profile name="Nickname" size="medium" number={feed.writerMemberImage} onClick={(e) => handleProfile(e)} />
          {/* <div onClick={(e) => e.stopPropagation()}>
            <Bookmark label="스크랩" checked={check} onChange={setCheck} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
