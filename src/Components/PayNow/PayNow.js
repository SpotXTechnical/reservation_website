import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getPaymentMethods } from "../../app/Apis/PaymentMethods";
import ModalComponent from "../Modal/Modal";
import { ModalBody } from "./ModalBody";
import styles from "./PayNow.module.css";
import { confirmReservation } from "../../app/Apis/confirmReservation";
import { useRouter } from "next/router";

export default function PayNow({ downPayment, amountToPay, Refetch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const toggleModal = () => {
    setIsOpen((current) => !current);
  };
  const handlePaymentMethod = () => {
    if (!amountToPay) {
      confirmReservation(id)
        .then(() => {
          Refetch(true);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        })
        .catch((error) => {
          return toast.error(error.message, { autoClose: 5000 });
        });
    } else {
      if (error || paymentMethods.length === 0) {
        return toast.error(error.message, { autoClose: 5000 });
      } else {
        toggleModal();
      }
    }
  };

  useEffect(() => {
    getPaymentMethods()
      .then((res) => {
        setPaymentMethods(res.data);
        setError(null);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <div className={styles.paynow}>
      <p className={styles.paynow_heading}>Request Accepted!</p>
      <div
        className={`${styles.CTA} ${styles.CTABtn_media} d-flex align-items-center`}
      >
        <p>
          We&apos;re pleased to inform you that your request has been
          successfully accepted. You can now proceed with the payment to
          complete the transaction.
        </p>
        <button className={styles.CTABtn} onClick={handlePaymentMethod}>
          {!amountToPay ? "Pay From Wallet" : `Pay Now ${amountToPay} LE`}
        </button>
      </div>
      <ModalComponent
        isOpen={isOpen && !error && amountToPay}
        toggleModal={toggleModal}
        modalBody={
          <ModalBody toggle={toggleModal} paymentMethods={paymentMethods} />
        }
        className="payment_methods"
      />
    </div>
  );
}
