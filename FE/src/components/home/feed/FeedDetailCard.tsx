import Badge from "@/components/common/Badge";
import Rating from "@/components/common/Rating";
import Tag from "@/components/common/Tag";
import Text from "@/components/common/Text";
import { ChildFeedListConfig } from "@/interface/Feed.interface";
import styles from "@styles/home/Home.module.scss";

interface Props {
  item: ChildFeedListConfig;
}

const FeedDetailCard = ({ item }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__info}>
        <div>
          <img src={item.toonImage} alt="웹툰 이미지" />
        </div>
        <div>
          <div>
            <Badge types="primary" label="Talk방 가기" sizes="small" />
            <Badge types="tertiary" label="웹툰 보러가기" sizes="small" />
          </div>
          <Text types="sub-header" bold="semi-bold">
            {item.toonName}
          </Text>
        </div>
      </div>
      <div className={styles.card__rank}>
        <div>
          <Text types="caption">평점</Text>
          <Rating sizes="medium" defaultValue={item.starring} readOnly />
        </div>
        <div>
          <Text types="caption">장르</Text>
          <div>
            {item.hashtagGenre.length > 0 &&
              item.hashtagGenre.map((tag, i) => {
                return <Tag key={i} label={`# ${tag}`} sizes="small" />;
              })}
          </div>
        </div>
        <div>
          <Text types="caption">분위기</Text>
          <div>
            {item.hashtagVibe.length > 0 &&
              item.hashtagGenre.map((tag, i) => {
                return <Tag key={i} label={`# ${tag}`} sizes="small" />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedDetailCard;
