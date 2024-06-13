import { ReactNode } from "react";
import styles from "@styles/common/Modal.module.scss";
import Button from "@components/common/Button";
import MuiModal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  btnTitle: string;
  onClick: () => void;
}

const Modal = ({ open, onClose, title, btnTitle, onClick }: Props) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <div className={styles.modal}>
        <CloseIcon onClick={onClose} />
        <span>{title}</span>
        <Button onClick={onClick}>{btnTitle}</Button>
      </div>
    </MuiModal>
  );
};

export default Modal;
