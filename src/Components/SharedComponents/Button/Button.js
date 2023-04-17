import styles from "./Button.module.css";

const Button = ({ text, className }) => {
  return (
    <button className={`${className} ${styles.button_wrapper}`}>{text}</button>
  );
};

export default Button;
