import styles from "@styles/common/Badge.module.scss";

interface Props {
  sizes: "small" | "medium" | "large";
  types: "primary" | "secondary" | "tertiary" | "gray";
  label: string;
}

const Badge = ({ sizes, types, label }: Props) => {
  return (
    <div className={[styles.badge, styles[`__${sizes}`], styles[`__${types}`]].join(" ")}>
      <span>{label}</span>
    </div>
  );
};

export default Badge;
