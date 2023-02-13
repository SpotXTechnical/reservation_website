import styles from "./HomeHeading.module.css";
import Input from "../SharedComponents/Input/Input";
import Button from "../SharedComponents/Button/Button";

const HomeHeading = () => {
  return (
    <div className={styles.home_heading_bg}>
      <h1 className={styles.heading_main_title} style={{ fontWeight: 600 }}>
        Discover and book with best service
      </h1>
      <div className={styles.heading_search_input_wrapper}>
        <img
          className={styles.heading_search_icon}
          src="/assets/search-normal.png"
          alt="search"
        ></img>
        <Input
          className={styles.heading_search_input}
          placeholder="Search for your destination"
        />
        <Button text="Search" className={styles.heading_btn} />
      </div>
    </div>
  );
};

export default HomeHeading;
