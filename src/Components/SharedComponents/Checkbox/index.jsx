import React from "react";
import styles from "./styles.module.css";

const Checkbox = ({ value, checked, label, className, handleChange }) => {
  return (
    <label className={`${styles.input_container}`}>
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={handleChange}
        className={className}
      />
      <span className={`${styles.checkmark}`}></span>
      <span className={`checkbox_label`}>{label}</span>
    </label>
  );
};

export default Checkbox;
