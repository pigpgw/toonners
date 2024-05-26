import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  types?: "display" | "headline" | "title" | "sub-header" | "body-1" | "body-2" | "caption" | "button";
  bold?: "regular" | "medium" | "semi-bold" | "bold";
}

const Text = ({ types = "body-1", bold = "regular", children }: Props) => {
  const setFontWeight: { [key: string]: string } = {
    regular: "400",
    medium: "500",
    "semi-bold": "600",
    bold: "700",
  };
  const style = {
    fontWeight: setFontWeight[bold ? bold : "regular"],
    fontSize: `var(--font-${types})`,
  };

  return <span style={style}>{children}</span>;
};

export default Text;
