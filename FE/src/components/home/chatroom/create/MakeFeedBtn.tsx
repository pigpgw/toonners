import { useNavigate } from "react-router-dom";
import Text from "@/components/common/Text";
import CreateIcon from "@mui/icons-material/Create";

const MakeFeedBtn = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/recommend/new")}>
      <CreateIcon sx={{ color: "var(--color-accent-1)" }} />
      <Text types="body-2" bold="medium">
        Feed 작성하기
      </Text>
    </div>
  );
};

export default MakeFeedBtn;
