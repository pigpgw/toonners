import styles from "@styles/home/Home.module.scss";
import Tag from "@components/common/Tag";
import Text from "@components/common/Text";
import Button from "@components/common/Button";

interface Props {
  item: any;
}

const RestChatItem = ({ item }: Props) => {
  return (
    <div className={styles.rest__item}>
      <div>
        <div className={styles.rest__img}>
          <img src={item.toonImageUrl} alt="대체" />
        </div>
        <div>
          <Text types="title" bold="semi-bold">
            {item.toonName}
          </Text>
          <Text>{item.contexts}</Text>
          <div className={styles.rest__tags}>
            <Tag label="# 태그" sizes="small" />
            <Tag label="# 태그" sizes="small" />
          </div>
        </div>
      </div>
      <Button types="primary" sizes="small">
        참여
      </Button>
    </div>
  );
};

export default RestChatItem;
