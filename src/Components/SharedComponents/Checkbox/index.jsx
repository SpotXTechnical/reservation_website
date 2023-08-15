import React from "react";

const Checkbox = ({ value, checked, label, className, handleChange }) => {
  return (
    <label className="checkbox_input_container">
      <input
        type="checkbox"
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

export default Checkbox;
