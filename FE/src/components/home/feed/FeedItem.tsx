import { useState } from "react";
import styles from "@styles/home/Home.module.scss";
import Text from "@components/common/Text";
import Tag from "@components/common/Tag";
import Profile from "@components/common/Profile";
import Bookmark from "@components/common/Tag/Bookmark";
import Rating from "@components/common/Rating";

interface Props {
  imgCount: number;
}

const FeedItem = ({ imgCount }: Props) => {
  const [check, setCheck] = useState(false);

  return (
    <div className={styles.feed__item}>
      <div className={styles.feed__imgs}>
        {Array.from({ length: imgCount }, () => 0).map((_, key) => {
          return <div key={key}></div>;
        })}
      </div>
      <div className={styles.feed__img}></div>
      <div className={styles.feed__info}>
        <div>
          <Text types="sub-header" bold="semi-bold">
            추천글 제목
          </Text>
          <Rating defaultValue={3} sizes="small" readOnly />
        </div>
        <div className={styles.rest__tags}>
          <Tag label="# 태그" sizes="small" />
          <Tag label="# 태그" sizes="small" />
        </div>
        <div className={styles.feed__profile}>
          <Profile name="Nickname" size="medium" number="" />
          <Bookmark label="스크랩" checked={check} onChange={setCheck} />
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
