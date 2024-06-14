import Header from "@/components/common/Header";
import MainProfile from "@/components/mypage/MainProfile";
import Text from "@/components/common/Text";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeChatListFrame from "@/components/home/chatroom/HomeChatRoomListFrame";
import { getUserFeed } from "@/api/feed";
import FeedItem from "@/components/other/feedItem";
import styles from "@/styles/other/Other.module.scss";
import { getUserData } from "@/api/myPage";
import { getOtherTalk } from "@/api/chat";

type User = {
  id: number;
  email: string;
  nickname: string;
  description: string;
  image: string | null;
  favoriteToons: unknown[];
  watchingToons: unknown[];
};

export const OtherPage = () => {
  const [user, setUser] = useState<User>();
  const [chatList, setChatList] = useState([]);
  const [feedList, setFeedList] = useState([]);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const otherId = location.href.split("/")[4];
    getOtherUserData(otherId);
    getUserChatList(otherId);
    getUserFeedList(otherId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserFeedList = async (userId: string) => {
    const response = await getUserFeed(userId);
    setFeedList(response);
  };

  const getUserChatList = async (userId: string) => {
    const res = await getOtherTalk(userId);
    setChatList(res);
  };

  const getOtherUserData = async (userId: string) => {
    try {
      const response = await getUserData(userId);
      setUser(response);
    } catch (e) {
      alert("유저 데이터 가져오기 실패");
      navigate("/home");
    }
  };

  return (
    <>
      <Header title="작성자 프로필 정보" before beforeClick={goBack} />
      <div className={styles.home}>
        <MainProfile
          imgUrl={user?.image || ""}
          introduction={user?.description || "안녕하세요"}
          nickName={user?.nickname || "유저"}
          edit={false}
        />
        <Text types="body-1" bold="bold">
          작성자가 참여중인 웹툰 단톡방
        </Text>
        {chatList.length > 0 ? (
          <HomeChatListFrame keyword="rest" list={chatList} />
        ) : (
          <div style={{ textAlign: "center", margin: "40px", color: "var(--color-gray-2)" }}>
            참여중인 단톡방이 없습니다!
          </div>
        )}
        <Text types="body-1" bold="bold">
          작성자가 작성한 Feed글
        </Text>
        {feedList.length > 0 ? (
          feedList.map((feed, i) => {
            return <FeedItem key={i} feed={feed} />;
          })
        ) : (
          <div style={{ textAlign: "center" }}>작성한 피드가 없습니다!</div>
        )}
      </div>
    </>
  );
};
