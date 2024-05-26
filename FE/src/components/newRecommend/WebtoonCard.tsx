import styles from "@/styles/makeRecommend/makeRecommend.module.scss";
import Text from "../common/Text/index";
import Tag from "@/components/common/Tag";
import Rating from "@/components/common/Rating";
import { useEffect } from "react";

interface Props {
  title: string | undefined;
  imgUrl: string | undefined;
  score: number | undefined;
  moodList: string[] | undefined;
  genreList: string[] | undefined;
}

const WebtoonCard = ({ title, imgUrl, score, moodList, genreList }: Props) => {
  useEffect(() => {
    console.log(imgUrl);
  });

  return (
    <div className={styles.webtoonCard}>
      <div>
        <img src={imgUrl} />
        <Text bold="bold" types="title">
          {title}
        </Text>
      </div>
      <div>
        <Text>별점</Text>
        <div>
          <Rating sizes="medium" defaultValue={score} readOnly />
        </div>
      </div>
      <div>
        <Text>장르</Text>
        <div> {genreList?.map((item: string) => <Tag sizes="small" label={`# ${item}`} />)}</div>
      </div>

      <div>
        <Text>분위기</Text>
        <div>{moodList?.map((item: string) => <Tag sizes="small" label={`# ${item}`} />)}</div>
      </div>
    </div>
  );
};

export default WebtoonCard;
