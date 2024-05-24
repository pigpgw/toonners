import { Rating as MuiRating } from "@mui/material";
import { SyntheticEvent } from "react";

interface Props {
  sizes: "small" | "medium" | "large";
  defaultValue?: number;
  readOnly?: boolean;
  onChange?: (event: SyntheticEvent<Element, Event>, value: number | null) => void;
}

const Rating = ({ sizes, ...rest }: Props) => {
  const setFontSize: { [key: string]: string } = {
    small: "12px",
    medium: "20px",
    large: "38px",
  };

  return <MuiRating sx={{ fontSize: setFontSize[sizes] }} {...rest} />;
};

export default Rating;
