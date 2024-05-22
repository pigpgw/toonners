import styles from "@styles/common/Profile.module.scss";
import { Avatar } from "@mui/material";
import Text from "../Text";

interface Props {
  name: string;
  onClick?: () => void;
}

const Profile = ({ name, ...rest }: Props) => {
  return (
    <div className={styles.profile} {...rest}>
      <Avatar />
      <Text types="title" bold="semi-bold">
        {name}
      </Text>
    </div>
  );
};

export default Profile;
