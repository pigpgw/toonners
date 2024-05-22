import { MouseEventHandler, ReactNode } from "react";
import styles from "@styles/common/Button.module.scss";
import Text from "@components/common/Text";

interface Props {
  children: ReactNode;
  types?: "primary";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button = ({ children = "Button", types = "primary", ...rest }: Props) => {
  return (
    <button className={[styles.button, styles[`__${types}`]].join(" ")} {...rest}>
      <Text types="button" bold="bold">
        {children}
      </Text>
    </button>
  );
};

export default Button;
