import ButtomNav from "@components/home/BottomNav";
import HomeTab from "@components/home/HomeTab";
import Logo from "@components/common/Logo";
import HomeRoutes from "@routes/HomeRoutes";

const HomePage = () => {
  return (
    <>
      <Logo />
      <HomeTab />
      <HomeRoutes />
      <ButtomNav />
    </>
  );
};

export default HomePage;
