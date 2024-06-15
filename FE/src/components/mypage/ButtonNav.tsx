import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import FaceIcon from "@mui/icons-material/Face";
import SearchIcon from "@mui/icons-material/Search";
import styles from "@styles/mypage/Mypage.module.scss";

const ButtomNav = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/home");
  };

  const handleSearch = () => {
    navigate("/search");
  };

  const handleMyPage = () => {
    navigate("/mypage");
  };

  return (
    <div className={styles.nav}>
      <div onClick={handleHome}>
        <HomeIcon />
      </div>
      <div onClick={handleSearch}>
        <SearchIcon />
      </div>
      <div onClick={handleMyPage}>
        <FaceIcon />
      </div>
    </div>
  );
};

export default ButtomNav;
