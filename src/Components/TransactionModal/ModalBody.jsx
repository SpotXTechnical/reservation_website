import React, { useEffect } from "react";
import { useTransaction } from "../../app/CustomHooks/Wallet/useTransaction";
import Image from "next/image";
import CreditAdd from "../../../public/assets/Lottie/AddTransaction.json";
import CreditDeduct from "../../../public/assets/Lottie/DeductTransaction.json";
import Unit from "../../../public/assets/unit.jpg";
import Calendar from "../../../public/assets/Combined Shape.svg";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import styles from "./ModalBody.module.css";
import moment from "moment";

export default function ModalBody({ card, toggle, icon }) {
  const { transactionData, loading, error } = useTransaction(card);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <div className="flex w-100">
        <Error error={"Test"} />
      </div>
    );
  }
  console.log(transactionData);
  const reason = {
    img: null,
    type: null,
    title: null,
    description: null,
    amount: null,
    reservation: null,
  };
  switch (card.reason) {
    case "fine":
      reason.img = CreditDeduct;
      reason.type = "Fine";
      reason.title = "Credit Deducted From Your Wallet";
      reason.description =
        "We regret to inform you that a deduction has been made from your wallet. We appreciate your continued engagement with our platform, and while we understand this may be disappointing, rest assured that we are committed to providing you with a seamless experience. Thank you for your ongoing support.";
      reason.amount = -card.amount;
      break;
    case "gift_card":
      reason.img = CreditAdd;
      reason.type = "Gift";
      reason.title = "Credit Added To Your Wallet";
      reason.description =
        "Congratulations! You've earned a special bonus for your loyalty and engagement with our platform. We've added a bonus amount to your wallet as a token of appreciation. Enjoy investing with us!";
      reason.amount = card.amount;
      break;
    default:
      break;
  }
  return (
    <div
      className={`d-flex  gap-4 ${
        card.reason === "fine" || card.reason === "gift_card"
          ? "p-3 align-items-center"
          : ""
      }`}
    >
      {(card.reason === "fine" || card.reason === "gift_card") && (
        <>
          <div
            className={`${
              card.reason === "fine" ? styles.fine : styles.gift_card
            }`}
          >
            <Player
              autoplay
              loop
              src={reason.img}
              style={{ width: "150px", height: "150px" }}
            ></Player>
          </div>

          <div className="d-flex flex-column">
            {reason.title && <p className="text-center">{reason.title}</p>}
            <p
              className={`${
                card.reason === "fine" ? styles.fine_amount : styles.gift_amount
              } text-center`}
            >
              {reason.amount} LE
            </p>
            <p className="mb-1">Reason</p>
            <p className={`${styles.reason_placeholder} lh-base`}>
              {reason.description}
            </p>
            <button className={`${styles.ok} mx-auto`} onClick={() => toggle()}>
              OK
            </button>
          </div>
        </>
      )}
      {card.reason !== "fine" && card.reason !== "gift_card" && (
        <>
          <div className={`d-flex gap-3 ${styles.transaction_image}`}>
            <Image
              src={Unit}
              alt="icon"
              style={{
                backgroundPosition: "center",
                borderRadius: "20px 0 0 20px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="d-flex flex-column gap-3 flex-grow-1 pt-4">
            <div className="d-flex gap-2">
              <Image src={icon} alt="icon" />
              <p>{transactionData?.reservation?.status?.toUpperCase()}</p>
            </div>
            <div className={styles.card}>
              <div className={styles.image_card}>
                <Image src={Calendar} alt="calendar" />
              </div>
              <div className="d-flex flex-grow-1 gap-2 flex-column justify-content-center">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0">Reservation Date</p>
                  <p className="mb-0">
                    {transactionData?.reservation?.days} Nights
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-0">
                    From:{" "}
                    <span className={styles.faded}>
                      {moment(transactionData?.reservation?.from).format(
                        "dddd, D MMMM"
                      )}
                    </span>
                  </p>
                  <p className="mb-0">
                    To:{" "}
                    <span className={styles.faded}>
                      {moment(transactionData?.reservation?.to).format(
                        "dddd, D MMMM"
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.image_card}>
                <Image src={Calendar} alt="calendar" />
              </div>
              <div className="d-flex justify-content-between align-items-center flex-grow-1">
                <p className="mb-0">Total Cost</p>
                <p className="mb-0">
                  {transactionData?.reservation?.total_price} LE
                </p>
              </div>
            </div>
            <div className={`${styles.card} flex-column gap-1`}>
              <p className="mb-0">Down Payment</p>
              <p
                className={`${
                  card.type === "in" ? styles.add : styles.deduct
                } mb-0`}
              >
                {card.type === "in"
                  ? `${card.amount.toFixed(2)} LE`
                  : `-${card.amount.toFixed(2)} LE`}
              </p>
            </div>
            <button className={`${styles.ok} mx-auto`} onClick={() => toggle()}>
              OK
            </button>
          </div>
        </>
      )}
    </div>
  );
}
