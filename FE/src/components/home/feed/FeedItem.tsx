import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { postFeedLike } from "@/api/feed";
import useFetchFeedLikes from "@/api/reactQuery/useFetchFeedLikes";
import { FeedListConfig } from "@/interface/Feed.interface";
import Tag from "@components/common/Tag";
import Text from "@components/common/Text";
import Profile from "@components/common/Profile";
import Heart from "@/components/common/Like";
import { ERROR_MESSAGE } from "@/constants/ErrorTypes";
import styles from "@styles/home/Home.module.scss";

interface Props {
  feed: FeedListConfig;
}

const FeedItem = ({ feed }: Props) => {
  const navigate = useNavigate();
  const { feedLikesState, feedLikesRefetch } = useFetchFeedLikes(String(feed.parentFeedId));

  const handleFeedItem = () => {
    navigate(`/recommend/${feed.parentFeedId}`);
  };

  const handleProfile = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate(`/profile/${feed.writerMemberId}`);
  };

  const clickLiked = async (e?: MouseEvent<HTMLDivElement>) => {
    if (e) {
      e.stopPropagation();
    }
    try {
      await postFeedLike(feed.parentFeedId);
      feedLikesRefetch();
    } catch (e) {
      alert(ERROR_MESSAGE.LIKED_ERROR);
    }
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
          {feed.hashtagsGenre.length > 0 &&
            feed.hashtagsGenre.map((tag, i) => {
              return <Tag key={i} label={`# ${tag}`} sizes="small" />;
            })}
          {feed.hashtagsVibe.length > 0 &&
            feed.hashtagsVibe.map((tag, i) => {
              return <Tag key={i} label={`# ${tag}`} sizes="small" />;
            })}
        </div>
        <div className={styles.feed__profile}>
          <Profile
            name={feed.writerMemberNickname}
            size="medium"
            number={feed.writerMemberImage}
            onClick={(e) => handleProfile(e)}
          />
          <Heart liked={feedLikesState} clickLikeBtn={clickLiked} feedId={feed.parentFeedId} />
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
