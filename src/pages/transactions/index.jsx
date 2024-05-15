"use client";
import React, { useEffect, useState } from "react";
import styles from "./Transactions.module.css";
import Error from "../../Components/Error/Error";
import { useWallet } from "../../app/CustomHooks/Wallet/useWallet";
import Loading from "../../Components/Loading/Loading";
import TransactionCard from "../../Components/TransactionCard/TransactionCard";
import Head from "next/head";

export default function Transactions() {
  const { balanceData, transactionsData, loading, error } = useWallet();
  if (error) {
    return <Error error={error.message} />;
  }
  if (loading) {
    return <Loading />;
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <>
      <Head>
        <title>{"Transactions" || "Loading..."} | SpotX</title>
        <meta name="description" content={"your transactions in SpotX"} />
      </Head>
      <div className="container">
        <div className={styles.container}>
          <div className={`${styles.balance} d-flex flex-column`}>
            <p className={styles.balance_title}>Your Balance</p>
            <p className={styles.amount}>
              {numberWithCommas(balanceData.balance)} LE
            </p>
          </div>
        </div>
        <h3 className="mt-5">Transactions</h3>
        <div className="d-flex flex-column gap-3 mb-5">
          {transactionsData.map((card) => (
            <TransactionCard card={card} key={card.id} />
          ))}
        </div>
      </div>
    </>
  );
}
