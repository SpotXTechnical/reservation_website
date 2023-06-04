import styles from "./ViewAll.module.css";
const ViewAll = ({ handleClick }) => {
  return (
    <p onClick={handleClick} className={styles.view_all}>
      View All
    </p>
  );
};

export default ViewAll;
