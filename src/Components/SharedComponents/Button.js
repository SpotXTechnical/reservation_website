import styles from "./Button.module.css";

const Button = ({ text }) => {
  return <button className={styles.button_wrapper}>{text}</button>;
};

export default Button;
