import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "@styles/home/Home.module.scss";
import chatStyles from "@styles/home/ChatRoom.module.scss";
import { getIsExist } from "@/api/chat";
import Badge from "@/components/common/Badge";
import Modal from "@/components/common/Modal";
import Rating from "@/components/common/Rating";
import Tag from "@/components/common/Tag";
import Text from "@/components/common/Text";
import { ChildFeedListConfig } from "@/interface/Feed.interface";

interface Props {
  item: ChildFeedListConfig;
}

const FeedDetailCard = ({ item }: Props) => {
  const navigate = useNavigate();
  const [isExist, setIsExist] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const checkIsExist = async () => {
    const res = await getIsExist(item.toonName);
    if (res === -1) {
      setIsExist(false);
    } else {
      setIsExist(true);
    }
    setModalOpen(true);
  };

  const moveToCreate = () => navigate("/chatroom/create");
  const moveToChatRoom = () => navigate(`/chatroom/${isExist}`);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.card__info}>
          <div>
            <img src={item.toonImage} alt="웹툰 이미지" />
          </div>
          <div>
            <div>
              <Badge types="primary" label="Talk방 가기" sizes="small" clickable onClick={checkIsExist} />
              {/* <Badge types="tertiary" label="웹툰 보러가기" sizes="small" /> */}
            </div>
            <Text types="sub-header" bold="semi-bold">
              {item.toonName}
            </Text>
          </div>
        </div>
        <div className={styles.card__rank}>
          <div>
            <Text types="caption">평점</Text>
            <Rating sizes="medium" defaultValue={item.starring} readOnly />
          </div>
          <div>
            <Text types="caption">장르</Text>
            <div>
              {item.hashtagGenre.length > 0 &&
                item.hashtagGenre.map((tag, i) => {
                  return <Tag key={i} label={`# ${tag}`} sizes="small" />;
                })}
            </div>
          </div>
          <div>
            <Text types="caption">분위기</Text>
            <div>
              {item.hashtagVibe.length > 0 &&
                item.hashtagGenre.map((tag, i) => {
                  return <Tag key={i} label={`# ${tag}`} sizes="small" />;
                })}
            </div>
          </div>
        </div>
      </div>
      {modalOpen && (
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          btnTitle={isExist ? "참여하기" : "생성하기"}
          title={
            <div className={chatStyles.text}>
              {isExist ? (
                <>
                  <Text types="title" bold="semi-bold">
                    이 방은 이미 존재해요.
                  </Text>
                  <Text types="title" bold="semi-bold">
                    참여하러 갈까요?
                  </Text>
                </>
              ) : (
                <>
                  <Text types="title" bold="semi-bold">
                    아직 Talk방이 존재하지 않아요.
                  </Text>
                  <Text types="title" bold="semi-bold">
                    새로 만들러 갈까요?
                  </Text>
                </>
              )}
            </div>
          }
          onClick={isExist ? moveToChatRoom : moveToCreate}
        />
      )}
    </>
  );
};

export default FeedDetailCard;
