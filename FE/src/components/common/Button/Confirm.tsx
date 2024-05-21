import { MouseEventHandler, ReactNode } from "react";
import styles from "@styles/common/Button.module.scss";
import Text from "@components/common/Text";

interface Props {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ConfirmButton = ({ children, ...rest }: Props) => {
  return (
    <button className={styles.confirm} {...rest}>
      <Text types="caption">{children}</Text>
    </button>
  );
};

export default ConfirmButton;
