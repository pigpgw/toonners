import styles from "@styles/common/Tag.module.scss";
import Text from "@components/common/Text";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

interface Props {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  onClick?: () => void;
}

const Bookmark = ({ label, checked, onChange, onClick }: Props) => {
  return (
    <div className={styles.bookmark}>
      <input id={label} type="checkbox" onChange={({ target: { checked } }) => onChange(checked)} onClick={onClick} />
      <label htmlFor={label}>
        {checked ? <BookmarkIcon sx={{ fontSize: "medium" }} /> : <BookmarkBorderIcon sx={{ fontSize: "medium" }} />}
        <Text types="button" bold="medium">
          스크랩
        </Text>
      </label>
    </div>
  );
};

export default Bookmark;
