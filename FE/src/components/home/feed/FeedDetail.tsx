import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "@styles/home/Home.module.scss";
import Header from "@/components/common/Header";
import Profile from "@/components/common/Profile";
import Tag from "@/components/common/Tag";
import Text from "@/components/common/Text";
import FeedDetailCard from "./FeedDetailCard";
import Bookmark from "@/components/common/Tag/Bookmark";
import { getFeedItem, postBookMark } from "@/api/feed";
import { FeedListConfig } from "@/interface/Feed.interface";

const FeedDetail = () => {
  const [checked, setChecked] = useState(false);
  const [detail, setDetail] = useState<FeedListConfig>({
    parentFeedId: 0,
    bookmarked: false,
    childFeedList: [
      {
        hashtagGenre: [],
        hashtagVibe: [],
        starring: 0,
        toonImage: "",
        toonName: "",
      },
    ],
    feedContexts: "",
    feedTitle: "",
    hashtags: [],
    writerMemberId: 0,
    writerMemberImage: "",
  });
  const params = useParams();
  const { id } = params;

  const setBookMark = async () => {
    await postBookMark(id!);
  };

  useEffect(() => {
    const getFeedDetail = async () => {
      const res = await getFeedItem(id!);
      setDetail(res);
      setChecked(res.bookmarked);
    };

    getFeedDetail();
  }, []);

  return (
    <>
      <Header
        title={detail.feedTitle}
        before={() => console.log("before")}
        button={<Bookmark label="스크랩" checked={checked} onChange={setChecked} onClick={setBookMark} />}
      />
      <div className={styles.feed__detail}>
        <div>
          <Profile name="닉네임" size="medium" number={detail.writerMemberImage} />
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
