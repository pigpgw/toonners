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

const FeedDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [checked, setChecked] = useState(false);
  const [detail, setDetail] = useState<FeedListConfig>(initialFeedList);

  const setBookMark = async () => {
    try {
      console.log("북마크 버튼 누름");
      await postBookMark(id!);
      setChecked(!checked);
    } catch (e) {
      console.log("북마크 실패 로그", e);
    }
  };

  useEffect(() => {
    const getFeedDetail = async () => {
      const res = await getFeedItem(id!);
      console.log(res);
      setDetail(res);
      setChecked(res.bookmarked);
    };

    getFeedDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header
        title={detail.feedTitle}
        before
        button={<Bookmark label="스크랩" checked={checked} onChange={setChecked} onClick={setBookMark} />}
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
