"use client";
import styles from "./SubscribeUs.module.css";
import Input from "../SharedComponents/Input/Input";
import Button from "../SharedComponents/Button/Button";

const SubscribeUs = () => {
  return (
    <div className={styles.wrapper}>
      <div className="col-sm-5">
        <p className={styles.subscribe_title}>Subscribe Us</p>
        <span className={styles.subscribe_sub_title}>
          subscribe us to know the news
        </span>
      </div>
      <div className="col-sm-7 d-flex">
        <div className="col-sm-8 col-md-9">
          <Input
            className={styles.subscribe_input}
            placeholder="Enter your email"
          />
        </div>
        <div className="col-sm-4 col-md-3">
          <Button text="Subscribe" className={styles.subscribe_btn} />
        </div>
      </div>
    </div>
  );
};

export default SubscribeUs;
