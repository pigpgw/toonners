import styles from "@styles/home/Home.module.scss";
import Tag from "@components/common/Tag";
import Text from "@components/common/Text";

const RestChatItem = () => {
  return (
    <div className={styles.rest__item}>
      <div>
        <Text types="body-2" bold="medium">
          웹툰 이름입니다.
        </Text>
        <Text>소개글</Text>
        <div className={styles.rest__tags}>
          <Tag label="# 태그" types="gray" size="big" />
          <Tag label="# 태그" types="gray" size="big" />
        </div>
      </div>
      <div className={styles.rest__img}></div>
    </div>
  );
};

export default RestChatItem;
