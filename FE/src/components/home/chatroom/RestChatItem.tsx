import styles from "@styles/home/Home.module.scss";
import Tag from "@components/common/Tag";
import Text from "@components/common/Text";
import ConfirmButton from "@/components/common/Button/Confirm";

const RestChatItem = () => {
  return (
    <div className={styles.rest__item}>
      <div>
        <div className={styles.rest__img}></div>
        <div>
          <Text types="title" bold="semi-bold">
            웹툰 이름입니다.
          </Text>
          <Text>소개글</Text>
          <div className={styles.rest__tags}>
            <Tag label="# 태그" types="gray" size="big" />
            <Tag label="# 태그" types="gray" size="big" />
          </div>
        </div>
      </div>
      <ConfirmButton>참여</ConfirmButton>
    </div>
  );
};

export default RestChatItem;
