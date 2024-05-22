// Button.js

import { MouseEventHandler, ReactNode } from "react";
import styles from "@styles/login/Button.module.scss";

interface ButtonProps {
  children?: ReactNode;
  types?:  "none";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ children, types, ...rest }: ButtonProps) => {
  return (
    <button className={`${styles.button} ${types ? `${styles[types]}` : ""}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
