import styles from "@styles/mypage/Mypage.module.scss";

interface Props {
  imgUrl: string;
}

const Profile = ({ imgUrl }: Props) => {
  return <img src={imgUrl} alt="" className={styles.profileImg} />;
};

export default Profile;
