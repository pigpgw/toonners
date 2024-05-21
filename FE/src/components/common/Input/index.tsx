import styles from "@styles/common/Input.module.scss";
import { InputAdornment, TextField, TextFieldProps, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  placeholder: string;
  types?: "default" | "search";
  value?: string | number;
}

const InputTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    fontSize: "var(--font-body-1)",
    height: "44px",
    borderRadius: "10px",
    "& fieldset": {
      borderColor: "var(--color-gray-1)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--color-black)",
      borderWidth: "1px",
    },
  },
});

const Input = ({ types, ...rest }: Props & TextFieldProps) => {
  return (
    <InputTextField
      className={styles.input}
      InputProps={
        types === "search"
          ? {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }
          : {}
      }
      {...rest}
    />
  );
};

export default Input;
