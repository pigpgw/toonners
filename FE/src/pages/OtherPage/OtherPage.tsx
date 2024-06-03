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
    console.log(otherId);
    getOtherUserData(otherId);
    getUserChatList(otherId);
    getUserFeedList(otherId);
  }, []);

  const getUserFeedList = async (userId: string) => {
    const response = await getUserFeed(userId);
    setFeedList(response);
  };

  const getUserChatList = async (userId: string) => {
    console.log("해당 유저 채팅방 조회");
  };

  const getOtherUserData = async (userId: string) => {
    const response = await getUserData(userId);
    console.log(response);
    setUser(response);
  };

  return (
    <>
      <Header title="작성자 프로필 정보" before beforeClick={goBack} />
      <div className={styles.home}>
        {user && (
          <MainProfile
            imgUrl={user?.image || ""}
            introduction={user?.description}
            nickName={user?.nickname}
            edit={false}
          />
        )}
        <Text types="body-1" bold="bold">
          작성자가 참여중인 웹툰 단톡방
        </Text>
        {chatList.length > 0 ? (
          <HomeChatListFrame keyword="rest" list={chatList} />
        ) : (
          <div style={{ textAlign: "center" }}>참여중인 단톡방이 없습니다!</div>
        )}
        <Text types="body-1" bold="bold">
          작성자가 작성한 Feed글
        </Text>
        {feedList.map((feed, i) => {
          return <FeedItem key={i} feed={feed} />;
        })}
      </div>
    </>
  );
};
