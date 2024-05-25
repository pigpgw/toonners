import Badge from "@/components/common/Badge";
import Rating from "@/components/common/Rating";
import Tag from "@/components/common/Tag";
import Text from "@/components/common/Text";
import styles from "@styles/home/Home.module.scss";

const FeedDetailCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.card__info}>
        <div>이미지</div>
        <div>
          <div>
            <Badge types="primary" label="Talk방 가기" sizes="small" />
            <Badge types="tertiary" label="웹툰 보러가기" sizes="small" />
          </div>
          <Text types="sub-header" bold="semi-bold">
            웹툰 제목
          </Text>
        </div>
      </div>
      <div className={styles.card__rank}>
        <div>
          <Text types="caption">평점</Text>
          <Rating sizes="medium" />
        </div>
        <div>
          <Text types="caption">장르</Text>
          <div>
            <Tag label="# 장르" sizes="small" />
            <Tag label="# 장르" sizes="small" />
            <Tag label="# 장르" sizes="small" />
          </div>
        </div>
        <div>
          <Text types="caption">분위기</Text>
          <div>
            <Tag label="# 장르" sizes="small" />
            <Tag label="# 장르" sizes="small" />
            <Tag label="# 장르" sizes="small" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedDetailCard;
