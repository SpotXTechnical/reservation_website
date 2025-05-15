import React from "react";
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
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "0.5rem",
      borderColor: state.isFocused ? "#44bcb7" : "#E2E8F0",
      boxShadow: state.isFocused ? "0 0 0 1px #44bcb7" : "none",
      "&:hover": {
        borderColor: "#44bcb7",
      },
      padding: "2px 4px",
      backgroundColor: "white",
      minHeight: "48px",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.5rem",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#4F46E5"
        : state.isFocused
        ? "#E0E7FF"
        : "white",
      color: state.isSelected ? "white" : "#1F2937",
      cursor: "pointer",
      padding: "10px 16px",
      "&:hover": {
        backgroundColor: state.isSelected ? "#4F46E5" : "#E0E7FF",
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#E0E7FF",
      borderRadius: "0.375rem",
      padding: "2px 2px 2px 8px",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#4F46E5",
      fontWeight: 500,
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#4F46E5",
      "&:hover": {
        backgroundColor: "#C7D2FE",
        color: "#4338CA",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9CA3AF",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }),
    input: (provided) => ({
      ...provided,
      color: "#1F2937",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: "#E5E7EB",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#6B7280",
      "&:hover": {
        color: "#4F46E5",
      },
    }),
    loadingIndicator: (provided) => ({
      ...provided,
      color: "#4F46E5",
    }),
    loadingMessage: (provided) => ({
      ...provided,
      color: "#6B7280",
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      color: "#6B7280",
    }),
  };

  const customComponents = {
    ...(hideIndecators
      ? {
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }
      : {}),
    LoadingMessage: ({ children }) => (
      <div className="tw-flex tw-items-center tw-justify-center tw-py-2">
        <svg
          className="tw-animate-spin tw-h-5 tw-w-5 tw-text-indigo-600 tw-mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="tw-opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="tw-opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Loading options...
      </div>
    ),
    NoOptionsMessage: ({ children }) => (
      <div className="tw-text-center tw-py-2 tw-text-gray-500">
        No options available
      </div>
    ),
  };

  return (
    <div className={`tw-relative ${className || ""}`}>
      <Select
        classNamePrefix="tw-select"
        instanceId="inputSelect"
        components={customComponents}
        value={value}
        isLoading={loading}
        isClearable={true}
        isMulti={isMulti}
        isSearchable={true}
        name="select-input"
        options={options}
        placeholder={placeholder}
        onChange={onChange}
        styles={customStyles}
        className="tw-w-full tw-text-gray-800 tw-text-base"
      />
      {loading && (
        <div className="tw-absolute tw-right-10 tw-top-1/2 tw-transform tw--translate-y-1/2">
          <svg
            className="tw-animate-spin tw-h-5 tw-w-5 tw-text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="tw-opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="tw-opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default InputSelect;
