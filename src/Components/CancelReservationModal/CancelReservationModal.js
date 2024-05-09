import React from "react";
import styles from "./CancelReservationModal.module.css";
import Link from "next/link";
import { cancelReservation } from "../../app/Apis/ReservationApis";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function CancelReservationModal({
  reservationStatus,
  closeModalCb,
  reservationId,
}) {
  let { lang } = useSelector((state) => state.language);
  const router = useRouter();

  const handleCancelReservation = () => {
    closeModalCb();
    cancelReservation(reservationId).then(() => {
      router.push("/reservations").then(() => {
        toast.success(
          lang === "ar"
            ? "تم إلغاء الحجز بنجاح"
            : "Reservation has been cancelled successfully",
          { autoClose: 5000 }
        );
      });
    });
  };
  return (
    <div>
      <h4 className={styles.header}>
        Are you sure you want to cancel Reservation?
      </h4>
      {reservationStatus === "reserved" && (
        <p className={styles.cancellation}>
          Please Read Our <Link href="/policy">Refund Policy</Link> Before
          Cancellation.
        </p>
      )}
      <div className="d-flex mt-5 gap-3 align-items-center justify-content-center">
        <button
          className={`btn  ${styles.CTA_yes}`}
          onClick={handleCancelReservation}
        >
          Yes
        </button>
        <button
          className={`btn  ${styles.CTA_no}`}
          onClick={() => closeModalCb()}
        >
          No
        </button>
      </div>
    </div>
  );
}
