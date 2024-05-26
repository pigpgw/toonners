import styles from "@styles/common/Tag.module.scss";

interface Props {
  sizes: "small" | "medium" | "large";
  clickable?: boolean;
  checked?: boolean;
  label: string;
  onClick?: () => void;
}

const Tag = ({ sizes = "medium", clickable = false, label, ...rest }: Props) => {
  return clickable ? (
    <div className={[styles.tag].join(" ")} {...rest}>
      <input id={label} type="checkbox" checked/>
      <label htmlFor={label} className={styles[`__${sizes}`]}>
        <span>{label}</span>
      </label>
    </div>
  ) : (
    <div className={[styles.tag, styles[`__${sizes}`]].join(" ")} {...rest}>
      <span>{label}</span>
    </div>
  );
};

export default Tag;
