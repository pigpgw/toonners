import styles from "@styles/common/Badge.module.scss";

interface Props {
  sizes: "small" | "medium" | "large";
  types: "primary" | "secondary" | "tertiary" | "gray";
  label: string;
  clickable?: boolean;
  onClick?: () => void;
}

const Badge = ({ sizes, types, label, clickable, ...rest }: Props) => {
  return (
    <div
      className={[styles.badge, styles[`__${sizes}`], styles[`__${types}`]].join(" ")}
      style={{ cursor: clickable ? "pointer" : "default" }}
      {...rest}
    >
      <span>{label}</span>
    </div>
  );
};

export default Badge;
