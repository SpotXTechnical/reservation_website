import { FormattedMessage } from "react-intl";

const Input = ({
  type,
  id,
  className,
  placeholder,
  onChange,
  error,
  value,
}) => {
  return (
    <>
      <input
        type={type || "text"}
        placeholder={placeholder}
        className={className}
        id={id}
        value={value}
        onChange={onChange}
      />
      {error && (
        <small className="text-danger">
          <FormattedMessage id={error} />
        </small>
      )}
    </>
  );
};

export default Input;
