import styles from "@styles/common/Header.module.scss";
import Text from "@components/common/Text";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Button from "@components/common/Button";

interface Props {
  title: string;
  button?: boolean;
  buttonName?: string;
  before: () => void;
}

const Header = ({ title, button, buttonName, before }: Props) => {
  const isButton = button ? "--visible" : "";
  return (
    <div className={styles.header}>
      <KeyboardArrowLeftIcon onClick={before} />
      <Text types="sub-header" bold="semi-bold">
        {title}
      </Text>
      <div className={styles[`header__button${isButton}`]}>
        <Button types="primary" sizes="small">
          {buttonName}
        </Button>
      </div>
    </div>
  );
};

export default Header;
