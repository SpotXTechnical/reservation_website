import React, { useState } from "react";
import payTabs from "../../../public/assets/paymentMethods/PayTabs-Logos_P-Mark.png";
import Image from "next/image";
import styles from "./PaymentCard.module.css";

export const PaymentCard = ({ cardData, onGeneratePaymentURL }) => {
  const [redirectURL, setRedirectURL] = useState(null);
  const provider = {
    name: "",
    icon: cardData.image,
  };
  switch (cardData.name) {
    case "Card payment":
      provider.name = "Card payment";
      break;
  }

  return (
    <div className={styles.paymentCard} onClick={onGeneratePaymentURL}>
      <div className={styles.imageContainer}>
        <img src={`${provider.icon}`} alt="paytabs" width={30} height={30} />
      </div>
      <h4>{provider.name}</h4>
    </div>
  );
};
