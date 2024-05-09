import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PaymentCard } from "../PaymentCard/PaymentCard";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import "./PaymentModal.css";
import { getPaymentURL } from "../../app/Apis/getPaymentURL";
import { PAYMOB, PAYTABS } from "../../app/Contstants/paymentProviders";
import { getToken } from "../../app/Apis/paymobPayment";
import { ReservationContext } from "../../pages/reservations/[id]";
import { useSelector } from "react-redux";

export const ModalBody = ({ paymentMethods }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const reservationData = useContext(ReservationContext);
  const { user } = useSelector((state) => state.auth);
  const handleGeneratePaymentURL = (method) => {
    setLoading(true);
    switch (method.provider) {
      case PAYTABS:
        getPaymentURL(
          id,
          `${process.env.NEXT_PUBLIC_WEBSITE_BASE_URL}/api/paytabs?q=${id}`
        )
          .then((res) => {
            const url = res.data.redirect_url;
            if (url) {
              window.open(url, "_self");
            }
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            setError(error.message);
          });
      case PAYMOB:
        getToken(reservationData, user)
          .then((response) => {
            setLoading(false);
            console.log(response);
          })
          .catch((error) => {
            setLoading(false);
            setError(error.message);
          });
        return;
    }
  };
  return (
    <main>
      <h2>Payment Method</h2>
      {!loading &&
        !error &&
        paymentMethods.map((paymentMethod) => {
          return (
            <PaymentCard
              cardData={paymentMethod}
              key={paymentMethod.id}
              onGeneratePaymentURL={() =>
                handleGeneratePaymentURL(paymentMethod)
              }
            />
          );
        })}
      {loading && <Loading />}
      {error && <Error error={error}></Error>}
    </main>
  );
};
