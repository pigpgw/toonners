// src/components/common/InputWithButton.jsx
import React from "react";
import styles from "@styles/common/InputWithButton.module.scss";
import Text from "@components/common/Text";

interface Props {
  btnName: string;
  inputText: string;
  inputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  placeHolder?: string;
  color?: "gray-1" | "white";
  label?: string;
}

const InputWithButton = ({ inputText, inputChange, onSubmit, btnName, placeHolder, color, label }: Props) => {
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
        <input
          style={{ backgroundColor: `var(--color-${color}` }}
          type="text"
          value={inputText}
          placeholder={placeHolder}
          onChange={inputChange}
        />
        <button className={styles.btn} onClick={onSubmit}>
          {btnName}
        </button>
      </div>
    </div>
  );
};

export default InputWithButton;
