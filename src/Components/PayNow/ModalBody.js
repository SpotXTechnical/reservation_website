import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PaymentCard } from "../PaymentCard/PaymentCard";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import "./PaymentModal.css";
import { getPaymentURL } from "../../app/Apis/getPaymentURL";
export const ModalBody = ({ paymentMethods }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const handleGeneratePaymentURL = () => {
    setLoading(true);
    getPaymentURL(id, `http://localhost:3000/reservations/${id}?q=pay`)
      .then((res) => {
        localStorage.setItem("tran_ref", JSON.stringify(res.data.tran_ref));
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
  };

  return (
    <div>
      <h2>Payment Method</h2>
      {!loading &&
        !error &&
        paymentMethods.map((paymentMethod) => {
          return (
            <PaymentCard
              cardData={paymentMethod}
              key={paymentMethod.id}
              onGeneratePaymentURL={handleGeneratePaymentURL}
            />
          );
        })}
      {loading && <Loading />}
      {error && <Error error={error}></Error>}
    </div>
  );
};
