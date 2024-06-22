import styles from "@styles/common/Like.module.scss";
import HeartSvg from "@assets/images/home/heart.svg?react";
import ClickedHeartSvg from "@assets/images/home/Fill.svg?react";
import { useFetchFeedLikes } from "@/api/reactQuery/useFeed";

interface Props {
  liked: boolean;
  clickLikeBtn?: () => void;
  feedId: number;
}

const Heart = ({ liked, clickLikeBtn, feedId }: Props) => {
  const { feedLikesState, feedLikesError, feedLkesLoading } = useFetchFeedLikes(String(feedId));
  if (feedLkesLoading) {
    return <div className={styles.heart}>...</div>;
  }

  if (feedLikesError) {
    return <div className={styles.heart}>좋아요 개수 불러오기 실패</div>;
  }
  return (
    <div className={styles.heart}>
      {feedLikesState !== undefined && (
        <>
          {!liked ? (
            <HeartSvg className={styles.heart__logo} onClick={clickLikeBtn} />
          ) : (
            <ClickedHeartSvg className={styles.heart__logo__clicked} onClick={clickLikeBtn} />
          )}
          <p className={styles.heart__cnt}>공감 {feedLikesState ? feedLikesState : 0}개</p>
        </>
      )}
    </div>
  );
};

export default Heart;
