import React from "react";

const Radio = ({ value, checked, label, className, handleChange }) => {
  return (
    <label className="radio_input_container">
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={handleChange}
        className={className}
      />
      <span className="checkmark"></span>
      <span className="checkbox_label">{label}</span>
    </label>
  );
};

export default Radio;
