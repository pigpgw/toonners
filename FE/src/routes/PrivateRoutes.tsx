import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "@styles/home/ChatRoom.module.scss";
import Modal from "@/components/common/Modal";
import Text from "@/components/common/Text";

export const PrivateRoute = () => {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("accessToken");
  const [open, setOpen] = useState(isLogin ? false : true);
  return isLogin ? (
    <Outlet />
  ) : (
    <Modal
      open={open}
      onClose={() => {
        navigate(-1);
        setOpen(false);
      }}
      onClick={() => navigate("/")}
      title={
        <div className={styles.text}>
          <Text types="title" bold="semi-bold">
            로그인을 해야 이용할 수 있어요.
          </Text>
          <Text types="title" bold="semi-bold">
            로그인 하시겠어요?
          </Text>
        </div>
      }
      btnTitle="로그인 하러 가기"
    />
  );
};
