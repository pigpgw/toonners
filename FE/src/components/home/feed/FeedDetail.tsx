import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "@styles/home/Home.module.scss";
import Header from "@/components/common/Header";
import Profile from "@/components/common/Profile";
import Tag from "@/components/common/Tag";
import Text from "@/components/common/Text";
import FeedDetailCard from "./FeedDetailCard";
import Bookmark from "@/components/common/Tag/Bookmark";
import { getFeedItem, postBookMark } from "@/api/feed";
import { FeedListConfig, initialFeedList } from "@/interface/Feed.interface";
import { getUserId } from "@/utils/authUtils";
import { useRecommendationStore } from "@/slices/useRecommendationStore";

const FeedDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [checked, setChecked] = useState(false);
  const [detail, setDetail] = useState<FeedListConfig>(initialFeedList);
  const [mine, setMine] = useState(false);
  const userId = getUserId();

  const { recommendationData, setPostTitle, setPostcotexts, addRecommendation } = useRecommendationStore();

  const setBookMark = async () => {
    try {
      await postBookMark(id!);
      setChecked(!checked);
    } catch (e) {
      console.log("북마크 실패 로그", e);
    }
  };

  useEffect(() => {
    const getFeedDetail = async () => {
      const res = await getFeedItem(id!);
      console.log("피드 데이터", res);

      if (res.writerMemberId === Number(userId)) setMine(true);
      else setMine(false);
      setDetail(res);
      setChecked(res.bookmarked);
    };

    getFeedDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickModift = () => {
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
    console.log("recommendationData", recommendationData);
    navigate("/recommend/new");
  };

  return (
    <>
      <Header
        title={detail.feedTitle}
        before={true}
        button={
          mine ? (
            <button className={styles.editBtn} onClick={clickModift}>
              수정
            </button>
          ) : (
            <Bookmark label="스크랩" checked={checked} onChange={setChecked} onClick={setBookMark} />
          )
        }
      />
      <div className={styles.feed__detail}>
        <div>
          <Profile
            name={detail.writerMemberNickname}
            size="medium"
            number={detail.writerMemberImage}
            onClick={() => navigate(`/profile/${detail.writerMemberId}`)}
          />
        </div>
        <div>
          {detail.hashtags.length > 0 &&
            detail.hashtags.map((tag, i) => {
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
