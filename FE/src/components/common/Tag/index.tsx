import { MouseEventHandler } from "react";
import styles from "@styles/common/Tag.module.scss";

interface Props {
  label: string;
  size?: "small" | "big";
  types?: "primary" | "secondary" | "gray";
  checked?: boolean;
  clickable?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const Tag = ({ label, size, types = "primary", clickable = false, ...rest }: Props) => {
  return clickable ? (
    <div className={styles.checkbox} {...rest}>
      <input id={label} type="checkbox" />
      <label htmlFor={label}>
        <span># {label}</span>
      </label>
    </div>
  ) : (
    <div className={styles[`tag__${size}--${types}`]}>
      <span>{label}</span>
    </div>
  );
};

export default Tag;
