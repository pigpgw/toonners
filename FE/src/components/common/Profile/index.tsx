import styles from "@styles/common/Profile.module.scss";
import { Avatar } from "@mui/material";
import Text from "../Text";

interface Props {
  name: string;
  size: "small" | "medium" | "large";
  onClick?: () => void;
}

const Profile = ({ name, size, ...rest }: Props) => {
  const profileSize = {
    small: { width: 24, height: 24 },
    medium: { width: 36, height: 36 },
    large: { width: 52, height: 52 },
  };
  return (
    <div className={styles.profile} {...rest}>
      <Avatar sx={profileSize[size]} />
      <Text types="title" bold="semi-bold">
        {name}
      </Text>
    </div>
  );
};

export default Profile;
