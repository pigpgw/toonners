import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FeedListConfig } from "@/interface/Feed.interface";
import Tag from "@components/common/Tag";
import Text from "@components/common/Text";
import Profile from "@components/common/Profile";
import styles from "@styles/other/Other.module.scss";

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
      <div className={styles.feed__info}>
        <div>
          <Text types="sub-header" bold="semi-bold">
            {feed.feedTitle}
          </Text>
          <Text>{feed.feedContexts}</Text>
          <div className={styles.rest__tags}>
            {feed.hashtagsGenre.length > 0 &&
              feed.hashtagsGenre.map((tag, i) => {
                return <Tag key={i} label={`# ${tag}`} sizes="small" />;
              })}
            {feed.hashtagsVibe.length > 0 &&
              feed.hashtagsVibe.map((tag, i) => {
                return <Tag key={i} label={`# ${tag}`} sizes="small" />;
              })}
          </div>
        </div>
        {feed.childFeedList && feed.childFeedList.length > 0 && (
          <img className={styles.itemImg} src={feed.childFeedList[0].toonImage} alt="" />
        )}
      </div>
      <div className={styles.feed__profile}>
        <Profile
          name={feed.writerMemberNickname}
          size="medium"
          number={feed.writerMemberImage}
          onClick={(e) => handleProfile(e)}
        />
        {/* <div onClick={(e) => e.stopPropagation()}>
            <Bookmark label="스크랩" checked={check} onChange={setCheck} />
          </div> */}
      </div>
    </div>
  );
};

export default FeedItem;
