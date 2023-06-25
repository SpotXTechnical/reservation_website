import React from "react";
import styles from "./styles.module.css";
import Checkbox from ".";

const CheckboxList = ({ list, handleChange }) => {
  return list.map((item, index) => {
    return (
      <Checkbox
        key={index}
        label={item.label}
        value={item.value}
        checked={item.checked}
        handleChange={handleChange}
        // handleChange={() => handleCheckboxChange(index, "hometype")}
        // className={`${styles.filter_radio}`}
      />
    );
  });
};

export default CheckboxList;
