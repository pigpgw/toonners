import { useNavigate } from "react-router-dom";
import styles from "@styles/home/Home.module.scss";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import FaceIcon from "@mui/icons-material/Face";

const ButtomNav = () => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const primary = "var(--color-primary)";
  const gray_2 = "var(--color-gray-2)";

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
        <HomeIcon sx={{ color: pathname === "/home" ? primary : gray_2 }} />
      </div>
      <div onClick={handleSearch}>
        <SearchIcon sx={{ color: pathname === "/search" ? primary : gray_2 }} />
      </div>
      <div onClick={handleMyPage}>
        <FaceIcon sx={{ color: pathname === "/mypage" ? primary : gray_2 }} />
      </div>
    </div>
  );
};

export default ButtomNav;