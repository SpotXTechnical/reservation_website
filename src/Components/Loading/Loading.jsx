import styles from "./Loading.module.css";
import React from "react";

export default function Loading() {
  return (
    <div className={styles.Loading_container}>
      <div className="spinner-border text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
