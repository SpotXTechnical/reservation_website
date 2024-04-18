import React, { useState } from "react";
import ModalComponent from "../../Components/Modal/Modal";
import Add from "../../../public/assets/Add.svg";
import Deduct from "../../../public/assets/Deduct.svg";
import Reservation from "../../../public/assets/reservation.svg";
import Gift from "../../../public/assets/SpotXGift.svg";
import Refund from "../../../public/assets/refund-2-line.svg";
import Compensation from "../../../public/assets/compensation.svg";
import Fine from "../../../public/assets/Minusfine.svg";
import Image from "next/image";
import "./ModalBody.css";
import moment from "moment";
import styles from "./TransactionCard.module.css";
import ModalBody from "../TransactionModal/ModalBody";
export default function TransactionCard({ card }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen((current) => !current);
  };
  let reason = { img: null, type: null };
  switch (card.reason) {
    case "fine":
      reason.img = Fine;
      reason.type = "Fine";
      break;
    case "refund":
      reason.img = Refund;
      reason.type = "Refund";
      break;
    case "gift_card":
      reason.img = Gift;
      reason.type = "Gift";
      break;
    case "reservation":
      reason.img = Reservation;
      reason.type = "Reservation";
    default:
      break;
  }
  return (
    <div className="d-flex align-items-center gap-4">
      <div
        className={`d-flex flex-grow-1 gap-4 p-4 align-items-center ${styles.transaction_card}`}
      >
        <div className={styles.side_icon}>
          {card.type === "in" ? (
            <Image src={Add} alt="status" />
          ) : (
            <Image src={Deduct} alt="status" />
          )}
        </div>
        <div className="d-flex flex-column w-100 gap-4">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-1 align-items-center">
              <Image src={reason.img} alt="icon" />
              <p
                className={`mb-0 fw-bold ${
                  card.reason === "gift_card" ? styles.gift : ""
                }`}
              >
                {reason.type?.toUpperCase()}
              </p>
            </div>
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
          <div className="d-flex justify-content-between flex-grow-1 w-100">
            <p className={`${styles.transaction_date} mb-0`}>
              Transaction Date :
            </p>
            <p className={`${styles.transaction_date} mb-0`}>
              {card?.created_at
                ? moment(card.created_at).format("DD/MM/YYYY")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
      <button className={styles.details} onClick={() => setIsOpen(true)}>
        View details
      </button>
      <ModalComponent
        isOpen={isOpen}
        toggleModal={toggleModal}
        modalBody={<ModalBody card={card} toggle={toggleModal} icon={reason.img} />}
        className="transaction_summary"
      />
    </div>
  );
}
