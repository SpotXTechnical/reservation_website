"use client";
import styles from "./SubscribeUs.module.css";

const SubscribeUs = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.app_images}>
        <img
          src="/assets/app-store.png"
          alt="app-store"
          className="cursor-pointer"
        />
        <img
          src="/assets/google-play.png"
          alt="google-play"
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SubscribeUs;
