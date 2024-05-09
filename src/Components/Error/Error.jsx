import React from "react";
import styles from "./Error.module.css";
export default function Error({ error }) {
  const handleReloadPage = () => {
    location.reload();
  };
  return (
    <div className={styles.error_container}>
      <h1 className={styles.error_message}>{error}</h1>
      <button className={styles.try_again_btn} onClick={handleReloadPage}>
        try again
      </button>
    </div>
  );
}
