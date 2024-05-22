import styles from "@styles/common/Input.module.scss";
import { TextField, TextFieldProps, styled } from "@mui/material";

const TextAreaField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    fontSize: "var(--font-body-1)",
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

const TextArea = ({ ...rest }: TextFieldProps) => {
  return <TextAreaField multiline className={styles.input} {...rest} />;
};

export default TextArea;
