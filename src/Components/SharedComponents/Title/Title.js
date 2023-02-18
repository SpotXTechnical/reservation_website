import styles from "./Title.module.css";
const Title = ({ text }) => {
  return <p className={styles.title}>{text}</p>;
};

export default Title;
