// src/components/common/InputWithButton.jsx
import React from "react";
import styles from "@styles/common/InputWithButton.module.scss";

interface Props {
  btnName: string;
  inputText: string;
  inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  placeHolder?: string;
}

const InputWithButton = ({ inputText, inputChange, onSubmit, btnName, placeHolder }: Props) => {
  return (
    <div className={styles.InputWithButton}>
      <input className={styles.input} type="text" value={inputText} placeholder={placeHolder} onChange={inputChange} />
      <button className={styles.btn} onClick={onSubmit}>
        {btnName}
      </button>
    </div>
  );
};

export default InputWithButton;
    