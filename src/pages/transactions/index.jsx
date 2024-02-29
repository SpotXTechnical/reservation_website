'use client'
import React, { useEffect, useState } from "react";
import styles from "./Transactions.module.css";
import Error from "../../Components/Error/Error";
export default function Transactions() {
  const [balance, setBalance] = useState();

  useEffect(() => {});

  return <Error error={"Error"} />;
  // <div className={styles.container}>
  //   <div className={`${styles.balance} d-flex flex-column`}>
  //     <p className={styles.balance_title}>Your Balance</p>
  //     <p className={styles.amount}>{balance} 500000 LE</p>
  //   </div>
  // </div>
}
