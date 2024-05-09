import React from "react";
import CreditAdd from "../../../public/assets/Lottie/AddTransaction.json";
import failed from "../../../public/assets/Lottie/failed.json";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

import Image from "next/image";
export default function PaymentStatusModal({ status, toggle }) {
  let cardStatus = {
    message: null,
    icon: null,
  };
  switch (status) {
    case "false":
      cardStatus.icon = failed;
      cardStatus.message =
        "It looks like your transaction wasn't successful. Please try again";
      break;
    case "true":
      cardStatus.icon = CreditAdd;
      cardStatus.message = "Success! Your transaction has been completed.";
  }
  return (
    <div>
      <div className="modal-header justify-content-center">
        <h4 className="modal-title fw-bold " id="modalTitle">
          Transaction Status
        </h4>
      </div>
      <div className="modal-body" id="modalBody">
        <Player
          autoplay
          loop
          src={cardStatus.icon}
          style={{ width: "150px", height: "150px" }}
        ></Player>
        <p className="text-center">{cardStatus.message}</p>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          onClick={toggle}
        >
          Close
        </button>
      </div>
    </div>
  );
}
