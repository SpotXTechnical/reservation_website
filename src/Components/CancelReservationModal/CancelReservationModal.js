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
    <div className="tw-p-4 sm:tw-p-6 tw-text-center">
      <h4 className="tw-text-lg sm:tw-text-xl lg:tw-text-2xl tw-font-semibold tw-text-gray-800 tw-mb-4 sm:tw-mb-6">
        Are you sure you want to cancel Reservation?
      </h4>
      {reservationStatus === "reserved" && (
        <p className="tw-text-sm sm:tw-text-base tw-text-gray-600 tw-mb-6 sm:tw-mb-8 tw-leading-relaxed">
          Please Read Our{" "}
          <Link
            href="/policy"
            className="tw-text-blue-600 hover:tw-text-blue-800 tw-underline tw-font-medium"
          >
            Refund Policy
          </Link>{" "}
          Before Cancellation.
        </p>
      )}
      <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-3 sm:tw-gap-4 tw-items-center tw-justify-center tw-mt-6 sm:tw-mt-8">
        <button
          className="tw-w-full sm:tw-w-auto tw-px-6 tw-py-3 tw-bg-red-600 hover:tw-bg-red-700 tw-text-white tw-font-medium tw-rounded-lg tw-transition-colors tw-duration-200 tw-min-w-20 sm:tw-min-w-24"
          onClick={handleCancelReservation}
        >
          Yes
        </button>
        <button
          className="tw-w-full sm:tw-w-auto tw-px-6 tw-py-3 tw-bg-gray-300 hover:tw-bg-gray-400 tw-text-gray-800 tw-font-medium tw-rounded-lg tw-transition-colors tw-duration-200 tw-min-w-20 sm:tw-min-w-24"
          onClick={() => closeModalCb()}
        >
          No
        </button>
      </div>
    </div>
  );
}
