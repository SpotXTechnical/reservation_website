import React from "react";
import styles from "./PayNow.module.css";
export default function PayNow({downPayment}) {
  return (
    <div className={styles.paynow}>
      <p className={styles.paynow_heading}>Request Accepted!</p>
      <div className={`${styles.CTA} d-flex align-items-center`}>
        <p>
          We&apos;re pleased to inform you that your request has been successfully
          accepted. You can now proceed with the payment to complete the
          transaction.
        </p>
        <button className={styles.CTABtn}>Pay Now {downPayment}LE</button>
      </div>
    </div>
  );
}
