import styles from "./HomeHeading.module.css";
import Input from "../SharedComponents/Input/Input";
import Button from "../SharedComponents/Button/Button";
import { FormattedMessage, useIntl } from "react-intl";

const HomeHeading = () => {
  const intl = useIntl();
  return (
    <div className={styles.home_heading_bg}>
      <h1 className={styles.heading_main_title} style={{ fontWeight: 600 }}>
        <FormattedMessage id="home.headingMainTitle" />
      </h1>
      <div className={styles.heading_search_input_wrapper}>
        <img
          className={styles.heading_search_icon}
          src="/assets/search-normal.png"
          alt="search"
        ></img>
        <Input
          className={styles.heading_search_input}
          placeholder={intl.formatMessage({
            id: "home.searchForYourDestination",
          })}
        />
        <Button
          text={intl.formatMessage({ id: "home.search" })}
          className={styles.heading_btn}
        />
      </div>
    </div>
  );
};

export default HomeHeading;
