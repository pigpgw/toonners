// src/components/common/InputWithButton.jsx
import React from "react";
import styles from "@styles/common/InputWithButton.module.scss";
import Text from "@components/common/Text";
import Input from "../Input";

interface Props {
  btnName: string;
  inputText: string;
  inputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  placeHolder?: string;
  colors?: "gray-1" | "white";
  label?: string;
  types: "default" | "search" | "message";
  messageBtn?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputWithButton = ({
  inputText,
  inputChange,
  onSubmit,
  btnName,
  placeHolder,
  colors,
  label,
  types = "default",
  messageBtn,
  onKeyDown,
}: Props) => {
  return (
    <div className={styles.InputWithButton}>
      {label !== "" && (
        <div className={styles.input__label}>
          <Text types="body-2" bold="bold">
            {label}
          </Text>
        </div>
      )}
      <div className={styles.input}>
        <Input
          types={types}
          value={inputText}
          colors={colors}
          placeholder={placeHolder ? placeHolder : ""}
          onChange={inputChange}
          submit={messageBtn}
          onKeyDown={onKeyDown}
        />
        <button className={styles.btn} onClick={onSubmit}>
          {btnName}
        </button>
      </div>
    </div>
  );
};

export default InputWithButton;
