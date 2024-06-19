import { getonMyFeed, getonMyScrap } from "@/api/myPage";
import { FeedListConfig } from "@/interface/Feed.interface";
import { useState, useEffect } from "react";

interface Props {
  isScrapType: boolean;
  goSomeWhere: () => void;
}

const useFetchMyList = ({ isScrapType, goSomeWhere }: Props) => {
  const [feedList, setFeedList] = useState<FeedListConfig[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await (isScrapType ? getonMyScrap() : getonMyFeed());
        res.reverse()
        res ? setFeedList(res) : setFeedList([]);
      } catch (error) {
        alert(`내 ${isScrapType ? "내 스트랩" : "내가 작성한 피드"} 리스트 가져오기 실패`);
        goSomeWhere();
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return feedList;
};

export default useFetchMyList;
