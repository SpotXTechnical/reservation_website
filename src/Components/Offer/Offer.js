import moment from "moment";
import React from "react";
import { FormattedMessage } from "react-intl";
import { acceptOffer, rejectOffer } from "../../app/Apis/ReservationApis";

export const Offer = ({ unitImage, alt, offer, setOffers, setRefetch }) => {
  const startDate = new Date(offer.from);
  const endDate = new Date(offer.to);
  const difference = endDate - startDate;
  const differenceInDays = difference / (24 * 60 * 60 * 1000);

  const handleDeclineOffer = async () => {
    const res = await rejectOffer(offer.id);
    console.log("offers", res);
    setOffers(res?.data?.offers);
    if (res?.data?.offers === null) {
      setRefetch(true);
    }
  };
  const handleAcceptOffer = async () => {
    const res = await acceptOffer(offer.id);
    setRefetch(true);
  };
  return (
    <div className="offers-container">
      <div className="image-container">
        <img src={unitImage} alt={alt} />
      </div>
      <div className="offer-details">
        <h3 className="offer-duration">{differenceInDays} Nights</h3>
        <div className="date-range">
          <div className="date">
            <p>
              <FormattedMessage id="from" />:
              <span>{moment(offer.from).format("ddd, DD MMM")}</span>
            </p>
            <p>
              <FormattedMessage id="to" />:
              <span>{moment(offer.to).format("ddd, DD MMM")}</span>
            </p>
          </div>
        </div>
        <div className="cost">
          <p className="title">
            <FormattedMessage id="totalCost" />
          </p>
          <p className="value">{offer.total_price} LE</p>
        </div>
        <div className="CTA-btns">
          <button className="decline" onClick={handleDeclineOffer}>
            Decline
          </button>
          <button className="accept" onClick={handleAcceptOffer}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
