import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "@styles/home/Home.module.scss";
import Header from "@/components/common/Header";
import Profile from "@/components/common/Profile";
import Tag from "@/components/common/Tag";
import Text from "@/components/common/Text";
import FeedDetailCard from "./FeedDetailCard";
import Bookmark from "@/components/common/Tag/Bookmark";
import { getFeedItem, postBookMark, postFeedLike } from "@/api/feed";
import { FeedListConfig, initialFeedList } from "@/interface/Feed.interface";
import { getUserId } from "@/utils/authUtils";
import { useRecommendationStore } from "@/slices/useRecommendationStore";
import Heart from "@/components/common/Like";
import useFetchFeedLikes from "@/api/reactQuery/useFetchFeedLikes";

const FeedDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [bookmarkClicked, setBookmarkClicked] = useState(false);
  const [likeClicked, setLikeClicked] = useState(false);
  const [detail, setDetail] = useState<FeedListConfig>(initialFeedList);
  const [mine, setMine] = useState(false);
  const userId = getUserId();

  const { setPostId, setPostTitle, setPostcotexts, addRecommendation } = useRecommendationStore();
  const { feedLikesRefetch } = useFetchFeedLikes(String(detail.parentFeedId));
  const setBookMark = async () => {
    try {
      await postBookMark(id!);
      setBookmarkClicked(!bookmarkClicked);
    } catch (e) {
      console.log("북마크 실패 로그", e);
    }
  };

  useEffect(() => {
    const getFeedDetail = async () => {
      const res = await getFeedItem(id!);

      if (res.writerMemberId === Number(userId)) setMine(true);
      else setMine(false);
      setDetail(res);
      setBookmarkClicked(res.bookmarked);
      setLikeClicked(res.liked);
    };

    getFeedDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likeClicked]);

  const clickModifyBtn = () => {
    setPostTitle(detail.feedTitle);
    setPostcotexts(detail.feedContexts);
    detail.childFeedList.map((feed) => {
      addRecommendation({
        title: feed.toonName,
        imageUrl: feed.toonImage,
        imageSiteUrl: feed.toonSiteUrl,
        starring: feed.starring,
        hashtagGenre: feed.hashtagGenre,
        hashtagVibe: feed.hashtagVibe,
      });
    });
    setPostId(detail.parentFeedId);
    navigate("/recommend/new");
  };

  const clickLiked = async () => {
    try {
      await postFeedLike(detail.parentFeedId);
      setLikeClicked(!likeClicked);
      feedLikesRefetch();
    } catch (e) {
      console.log("좋아요 누르기 실패");
    }
  };

  return (
    <>
      <Header
        title={detail.feedTitle}
        before={true}
        button={
          mine ? (
            <button className={styles.editBtn} onClick={clickModifyBtn}>
              수정
            </button>
          ) : (
            <Bookmark label="스크랩" checked={bookmarkClicked} onChange={setBookmarkClicked} onClick={setBookMark} />
          )
        }
      />
      <div className={styles.feed__detail}>
        <div style={{ height: "60px", display: "flex", justifyContent: "space-between" }}>
          <Profile
            name={detail.writerMemberNickname}
            size="medium"
            number={detail.writerMemberImage}
            onClick={() => navigate(`/profile/${detail.writerMemberId}`)}
          />
          <Heart liked={likeClicked} clickLikeBtn={clickLiked} feedId={detail.parentFeedId} />
        </div>
        <div>
          <div className={styles.tagTitle}>
            <Text types="caption">장르</Text>
          </div>
          {detail.hashtagsGenre.length > 0 &&
            detail.hashtagsGenre.map((tag, i) => {
              return <Tag key={i} label={`# ${tag}`} sizes="small" />;
            })}
        </div>
        <div>
          <div className={styles.tagTitle}>
            <Text types="caption">분위기</Text>{" "}
          </div>
          {detail.hashtagsVibe.length > 0 &&
            detail.hashtagsVibe.map((tag, i) => {
              return <Tag key={i} label={`# ${tag}`} sizes="small" />;
            })}
        </div>

        <div>
          <Text>{detail.feedContexts}</Text>
        </div>
        <div>
          {detail.childFeedList.length > 0 &&
            detail.childFeedList.map((item, i) => {
              return <FeedDetailCard key={i} item={item} />;
            })}
        </div>
      </div>
    </>
  );
};

export default FeedDetail;
