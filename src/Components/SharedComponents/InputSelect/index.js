import React, { useState } from "react";
import Select from "react-select";

const InputSelect = ({
  options,
  className,
  placeholder,
  hideIndecators,
  loading,
  value,
  onChange,
  isMulti,
}) => {
  // options = [
  // 	{ value: 1, label: 'Chocolate' },
  // 	{ value: 10, label: 'Strawberry' },
  // 	{ value: 159, label: 'Vanilla' }
  // ]

  return (
    <>
      <Select
        className={className}
        classNamePrefix="select"
        components={
          hideIndecators
            ? { DropdownIndicator: () => null, IndicatorSeparator: () => null }
            : null
        }
        value={value}
        // isLoading={true}
        // isClearable={true}
        // isRtl={isRtl}
        // menuIsOpen={true}
        isMulti={isMulti}
        isSearchable={true}
        name="color"
        options={options}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
};

export default InputSelect;
