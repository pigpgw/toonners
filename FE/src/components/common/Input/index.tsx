import styles from "@styles/common/Input.module.scss";
import Text from "@components/common/Text";
import { InputAdornment, TextField, TextFieldProps, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";

interface Props {
  label?: string;
  placeholder: string;
  types: "default" | "search" | "message";
  value?: string | number;
  colors?: "gray-1" | "white";
  submit?: () => void;
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
      borderColor: "var(--color-primary)",
      borderWidth: "1px",
    },
    "& .MuiInputAdornment-positionEnd": {
      color: "var(--color-primary)",
    },
  },
});

const Input = ({ label, types = "default", colors = "gray-1", submit, ...rest }: Props & TextFieldProps) => {
  const setAdornment = {
    default: {},
    search: {
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    },
    message: {
      endAdornment: (
        <InputAdornment position="end" onClick={submit}>
          <SendIcon sx={{ fontSize: "medium" }} />
        </InputAdornment>
      ),
    },
  };
  return (
    <div className={styles.input}>
      {label !== "" && (
        <div className={styles.input__label}>
          <Text types="body-2" bold="bold">
            {label}
          </Text>
        </div>
      )}
      <InputTextField
        className={styles.input__field}
        style={{ backgroundColor: `var(--color-${colors})` }}
        InputProps={setAdornment[types]}
        {...rest}
      />
    </div>
  );
};

export default Input;
