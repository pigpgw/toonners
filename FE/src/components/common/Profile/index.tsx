import styles from "@styles/common/Profile.module.scss";
import { Avatar } from "@mui/material";
import Text from "@components/common/Text";
import { MouseEvent, useEffect } from "react";

interface Props {
  name: string;
  size: "small" | "medium" | "large";
  number: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

const Profile = ({ name, size, number = "2", ...rest }: Props) => {
  const createImageElement = () => {
    return new URL(`../../../assets/characters/character_${number}.svg`, import.meta.url).href;
  };

  useEffect(() => {
    createImageElement();
  }, []);

  const profileSize = {
    small: { width: 24, height: 24 },
    medium: { width: 36, height: 36 },
    large: { width: 52, height: 52 },
  };
  return (
    <div className={styles.profile} {...rest}>
      <Avatar id="avatar" sx={profileSize[size]} src={createImageElement()} />
      <Text types="title" bold="semi-bold">
        {name}
      </Text>
    </div>
  );
};

export default Profile;
