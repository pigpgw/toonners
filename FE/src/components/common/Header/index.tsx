import styles from "@styles/common/Header.module.scss";
import Text from "@components/common/Text";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { ReactNode } from "react";

interface Props {
  title: string;
  button?: ReactNode;
  before: () => void;
}

const Header = ({ title, button, before }: Props) => {
  const isButton = button ? "--visible" : "";
  return (
    <div className={styles.header}>
      <KeyboardArrowLeftIcon onClick={before} />
      <Text types="sub-header" bold="semi-bold">
        {title}
      </Text>
      <div className={styles[`header__button${isButton}`]}>{button}</div>
    </div>
  );
};

export default Header;
