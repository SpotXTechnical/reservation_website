import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import store, { langAction } from "../../store";
import {
  cancelReservation,
  getReservationDetails,
} from "../../app/Apis/ReservationApis";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Carousel } from "react-responsive-carousel";
import { ShimmerThumbnail } from "react-shimmer-effects";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import { getIcon } from "../../app/utils";
import Image from "next/image";
import { FinancialSummary } from "../../Components/FinancialSummary/FinancialSummary";
import PayNow from "../../Components/PayNow/PayNow";
import Check from "../../../public/assets/check-square-broken.svg";
import { NegotiationStatement } from "../../Components/NegotiationStatement/NegotiationStatement";
import { Offer } from "../../Components/Offer/Offer";

export default function SubRegion() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({});
  const [refetch, setRefetch] = useState(false);
  const icon = getIcon(data.status);
  const [offers, setOffers] = useState(null);
  const financialObj = {
    to: moment(data?.to).format("ddd, DD MMM"),
    from: moment(data?.from).format("ddd, DD MMM"),
    nights: data?.days,
    totalCost: data?.total_price,
    walletBalance: data?.wallet_balance,
    downPayment: data?.down_payment,
    cashToOwner: data?.cash_to_owner,
    subTotal: data?.sub_total,
  };
  let { lang } = useSelector((state) => state.language);
  if (typeof window !== "undefined") {
    const storedLanguage = localStorage.getItem("language");
    const language = storedLanguage ? storedLanguage : "en";
    store.dispatch(
      language === "ar" ? langAction.langAr() : langAction.langEn()
    );
  }

  const handleRedirectToOwnerProfile = (id) => {
    router.push(`/owner/${id}`);
  };

  const handleCancelReservation = (id) => {
    cancelReservation(id).then((res) => {
      res &&
        toast.success(
          lang === "ar" ? "تم الغاء الحجز" : "Reservation is cancelled",
          { autoClose: 5000 }
        );
      router.push("/reservations");
    });
  };
  console.log(financialObj);
  useEffect(
    function () {
      if (id) {
        getReservationDetails(id)
          .then((res) => {
            setData(res.data);
            setOffers(res.data?.offers);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    },
    [id, lang, refetch]
  );

  const handleClick = () => {
    router.push(`/properties/${data?.unit?.id}`);
  };

  return (
    <div className="reservation_container" dir={lang === "ar" ? "rtl" : "ltr"}>
      {data?.unit?.images ? (
        <div className={`flex-center head`}>
          <Carousel showThumbs={false} showStatus={false} emulateTouch={true}>
            {data?.unit?.images?.map((slide) => (
              <div key={slide.id}>
                <div
                  className="carousel_img"
                  style={{ backgroundImage: `url(${slide.url}` }}
                ></div>
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <ShimmerThumbnail height={500} rounded />
      )}
      <div className="details_wrapper">
        <div className="view_details_wrapper">
          <div className="statuses_wrapper">
            <p className={`align-self-end status ${data.status} icon-text`}>
              {icon?.src && <Image {...icon} alt="pending" />}
              {data.status}
            </p>
          </div>
          <p onClick={handleClick} className="view_details">
            <FormattedMessage id="viewDetais" />
          </p>
        </div>
        <div className="location_details">
          {(data?.unit?.title ||
            data?.unit?.sub_region_name ||
            data?.unit?.region_name) && (
            <p>
              {data?.unit?.title}, {data?.unit?.sub_region_name},{" "}
              {data?.unit?.region_name}
            </p>
          )}
        </div>
        {data?.status === "reserved" && (
          <>
            <hr className="total_price_hr" />
            <div className="reservation-success">
              <h3 className="reservation-success__header">
                <Image {...Check} alt="checkIcon" /> Reservation Confirmed!
              </h3>
              <p className="reservation-success__description">
                Great news, Your down payment for this {data?.unit?.type} has
                been successfully processed. You&apos;ll complete the total cost
                on the first day of your reservation.
              </p>
            </div>
          </>
        )}
        {data?.status === "negotiation" && (
          <>
            <hr className="total_price_hr" />
            <div>
              <NegotiationStatement />
              {offers &&
                offers?.length > 0 &&
                offers.map((offer) => (
                  <Offer
                    key={offer.id}
                    unitImage={data?.unit.main_image.url}
                    alt={data?.unit.type}
                    offer={offer}
                    setOffers={setOffers}
                    setRefetch={setRefetch}
                  />
                ))}
            </div>
          </>
        )}

        {data?.status === "pending" && (
          <>
            <hr className="total_price_hr" />
            <div className="feedback">
              <h3>Request Submitted</h3>
              <p>
                Awaiting Owner&apos;s Approval (Response will be within 2
                hours).
              </p>
            </div>
          </>
        )}
        {Object.keys(data).length > 0 && (
          <>
            <hr className="total_price_hr" />
            <div>
              <h3 className="financial_summary">Summary</h3>
              <FinancialSummary {...financialObj} />
            </div>
          </>
        )}

        {data.status === "accepted" && (
          <>
            <hr className="total_price_hr" />
            <PayNow downPayment={data.down_payment} />
          </>
        )}
        <hr className="total_price_hr" />
        {data?.unit?.owner?.name ? (
          <>
            <h3 className="owner_heading">Owner</h3>
            <div
              className="owner"
              onClick={() =>
                handleRedirectToOwnerProfile(data?.unit?.owner?.id)
              }
            >
              <img src={data?.unit?.owner?.image} alt="owner_img" />
              <p>{data?.unit?.owner?.name} </p>
              {data?.status === "reserved" && (
                <p>{data?.unit?.owner?.phone} </p>
              )}
            </div>
          </>
        ) : (
          <ShimmerThumbnail height={175} rounded />
        )}
        {data.status !== "canceled" && data.status !== "rejected" && (
          <>
            <hr className="total_price_hr" />
            <div className="cancellation_policy">
              <h3>Cancellation policy</h3>
              <div className="free_cancellation">
                <p>
                  <FormattedMessage id="Free-free cancellation" />
                </p>
                <button
                  onClick={() =>
                    data.status !== "reserved"
                      ? handleCancelReservation(data.id)
                      : null
                  }
                >
                  <FormattedMessage id="cancel reservation" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
