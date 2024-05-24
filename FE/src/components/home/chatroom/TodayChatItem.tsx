import styles from "@styles/home/Home.module.scss";
import Text from "@components/common/Text";
import Button from "@components/common/Button";
import Rating from "@components/common/Rating";
import Badge from "@components/common/Badge";

const TodayChatItem = () => {
  return (
    <div className={styles.today__item}>
      <div>
        <Text types="sub-header" bold="semi-bold">
          1
        </Text>
        <div></div>
        <div className={styles.today__info}>
          <Text types="title" bold="semi-bold">
            웹툰 이름입니다.
          </Text>
          <Rating defaultValue={3} sizes="small" readOnly />
          <Badge label="🔥 NN" sizes="small" types="primary" />
        </div>
      </div>
      <Button types="primary" sizes="small">
        참여
      </Button>
    </div>
  );
};

export default TodayChatItem;
