import styles from "@styles/common/Tag.module.scss";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

interface Props {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Bookmark = ({ label, checked, onChange }: Props) => {
  return (
    <div className={styles.bookmark}>
      <input id={label} type="checkbox" onChange={({ target: { checked } }) => onChange(checked)} />
      <label htmlFor={label}>
        {checked ? <BookmarkIcon sx={{ fontSize: "small" }} /> : <BookmarkBorderIcon sx={{ fontSize: "small" }} />}
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Bookmark;
