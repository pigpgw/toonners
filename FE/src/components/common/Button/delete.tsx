import { ReactNode } from "react";
import styles from '@styles/common/Button.module.scss'

interface Props {
  children: ReactNode;
  onClick: () => void;
}

const Button = ({ children,onClick }: Props) => {
  return <button className={styles.deleteBtn}  onClick={onClick}>{children}</button>;
};

export default Button;
