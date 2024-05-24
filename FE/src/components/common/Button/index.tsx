import { MouseEventHandler, ReactNode } from "react";
import styles from "@styles/common/Button.module.scss";
import Text from "@components/common/Text";

interface Props {
  children: ReactNode;
  types?: "primary" | "black";
  sizes?: "small" | "big";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button = ({ children = "Button", types = "primary", sizes = "big", ...rest }: Props) => {
  return (
    <button className={[styles.button, styles[`__${types}`], styles[`__${sizes}`]].join(" ")} {...rest}>
      <Text types="button" bold={sizes === "small" ? "regular" : "bold"}>
        {children}
      </Text>
    </button>
  );
};

export default Button;
