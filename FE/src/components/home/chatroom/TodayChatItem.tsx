import styles from "@styles/home/Home.module.scss";
import Tag from "@components/common/Tag";
import Text from "@components/common/Text";
import Button from "@components/common/Button";
import { Rating } from "@mui/material";

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
          <Rating value={3} sx={{ fontSize: "12px" }} readOnly />
          <Tag label="🔥 NNN" size="small" />
        </div>
      </div>
      <Button types="primary" sizes="small">
        참여
      </Button>
    </div>
  );
};

export default TodayChatItem;
