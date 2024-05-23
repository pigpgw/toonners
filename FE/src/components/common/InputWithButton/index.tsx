// src/components/common/InputWithButton.jsx
import React from "react";
import styles from "@styles/common/InputWithButton.module.scss";

interface Props {
  btnName: string;
  inputText: string;
  inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  placeHolder?: string;
  color?: "gray-1" | "white";
}

const InputWithButton = ({ inputText, inputChange, onSubmit, btnName, placeHolder, color }: Props) => {
  return (
    <div className={styles.InputWithButton}>
      <input
        style={{ backgroundColor: `var(--color-${color}` }}
        className={styles.input}
        type="text"
        value={inputText}
        placeholder={placeHolder}
        onChange={inputChange}
      />
      <button className={styles.btn} onClick={onSubmit}>
        {btnName}
      </button>
    </div>
  );
};

export default InputWithButton;
