import styles from "@styles/common/Header.module.scss";
import Text from "@components/common/Text";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  button?: ReactNode;
  before?: boolean;
  beforeClick?: () => void;
}

const Header = ({ title, button, before, beforeClick }: Props) => {
  const navigate = useNavigate();
  const handleBefore = () => navigate(-1);
  const isButton = button ? "--visible" : "";

  return (
    <div className={styles.header}>
      <KeyboardArrowLeftIcon
        sx={{ visibility: before ? "visible" : "hidden" }}
        onClick={beforeClick ? beforeClick : handleBefore}
      />
      <Text types="sub-header" bold="semi-bold">
        {title}
      </Text>
      <div className={styles[`header__button${isButton}`]}>{button}</div>
    </div>
  );
};

export default Header;
