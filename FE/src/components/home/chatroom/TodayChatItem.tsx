import styles from "@styles/home/Home.module.scss";
import Tag from "@components/common/Tag";
import Text from "@components/common/Text";
import ConfirmButton from "@components/common/Button/Confirm";
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
      <ConfirmButton>참여</ConfirmButton>
    </div>
  );
};

export default TodayChatItem;
