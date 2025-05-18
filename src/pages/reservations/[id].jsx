import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import store, { langAction } from "../../store";
import { getReservationDetails } from "../../app/Apis/ReservationApis";
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
import ModalComponent from "../../Components/Modal/Modal";
import { verifyTransacion } from "../../app/Apis/VerifyTransaction";
import PaymentStatusModal from "../../Components/PaymentStatusModal/PaymentStatusModal";
import Link from "next/link";
import CancelReservationModal from "../../Components/CancelReservationModal/CancelReservationModal";
import Head from "next/head";

// Reservation Context
export const ReservationContext = createContext();
export default function SubRegion() {
  const router = useRouter();
  const { id, success } = router.query;
  const [data, setData] = useState({});
  const [refetch, setRefetch] = useState(false);
  const icon = getIcon(data.status);
  const [offers, setOffers] = useState(null);
  const financialObj = {
    to: moment(data?.to).format("ddd, DD MMM"),
    from: moment(data?.from).format("ddd, DD MMM"),
    nights: data?.days,
    totalCost: data?.total_price,
    PayFromWallet: data?.pay_from_wallet,
    downPayment: data?.down_payment,
    cashToOwner: data?.cash_to_owner,
    subTotal: data?.amount_to_pay,
    status: data?.status,
    hotelData: data?.details,
  };
  const [paymentStatusModal, setPaymentStatusModal] = useState(false);
  const [cancellationModal, setCancellationModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  let { lang } = useSelector((state) => state.language);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      const language = storedLanguage ? storedLanguage : "en";
      store.dispatch(
        language === "ar" ? langAction.langAr() : langAction.langEn()
      );
    }
  }, []);

  const handleRedirectToOwnerProfile = (id) => {
    router.push(`/owner/${id}`);
  };

  const handleCancelReservation = (id) => {
    toggleCancellationModal();
  };
  const toggleCancellationModal = () => {
    setCancellationModal((current) => !current);
  };
  const togglePaymentModal = () => {
    setPaymentStatusModal((current) => !current);
  };

  useEffect(
    function () {
      if (id) {
        getReservationDetails(id)
          .then((res) => {
            setData(res.data);
            setOffers(res.data?.offers);
          })
          .catch((error) => {});
      }
    },
    [id, lang, refetch]
  );

  useEffect(() => {
    if (success) {
      setPaymentStatus(success);
      togglePaymentModal();
    }
  }, [success]);

  const handleClick = () => {
    router.push(`/properties/${data?.unit?.id}`);
  };

  return (
    <>
      <Head>
        <title>{data?.unit?.title || "Loading..."}</title>
        <meta name="description" content={data?.unit?.description} />
      </Head>
      <div
        className="tw-min-h-screen tw-bg-gray-50 tw-p-4 sm:tw-p-6 lg:tw-p-8"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <div className="tw-max-w-4xl tw-mx-auto tw-bg-white tw-rounded-lg tw-shadow-lg tw-overflow-hidden">
          {/* Image Carousel Section */}
          {data?.unit?.images ? (
            <div className="tw-relative tw-w-full tw-h-64 sm:tw-h-80 md:tw-h-96 lg:tw-h-[500px]">
              <Carousel
                showThumbs={false}
                showStatus={false}
                emulateTouch={true}
              >
                {data?.unit?.images?.map((slide) => (
                  <div key={slide.id}>
                    <div
                      className="tw-w-full tw-h-64 sm:tw-h-80 md:tw-h-96 lg:tw-h-[500px] tw-bg-cover tw-bg-center tw-bg-no-repeat"
                      style={{ backgroundImage: `url(${slide.url})` }}
                    ></div>
                  </div>
                ))}
              </Carousel>
            </div>
          ) : (
            <div className="tw-w-full tw-h-64 sm:tw-h-80 md:tw-h-96 lg:tw-h-[500px]">
              <ShimmerThumbnail height="100%" rounded />
            </div>
          )}

          {/* Content Section */}
          {data && Object.keys(data).length > 0 && (
            <div className="tw-p-4 sm:tw-p-6 lg:tw-p-8">
              {/* Status and View Details */}
              <div className="tw-flex tw-flex-col sm:tw-flex-row tw-justify-between tw-items-start sm:tw-items-center tw-mb-6 tw-gap-4">
                <div className="tw-flex tw-items-center tw-gap-2">
                  <p
                    className={`tw-px-3 tw-py-1 tw-rounded-full tw-text-sm tw-font-medium tw-flex tw-items-center tw-gap-2 
                  ${
                    data?.status === "reserved"
                      ? "tw-bg-green-100 tw-text-green-800"
                      : ""
                  }
                  ${
                    data?.status === "pending"
                      ? "tw-bg-yellow-100 tw-text-yellow-800"
                      : ""
                  }
                  ${
                    data?.status === "negotiation"
                      ? "tw-bg-blue-100 tw-text-blue-800"
                      : ""
                  }
                  ${
                    data?.status === "accepted"
                      ? "tw-bg-purple-100 tw-text-purple-800"
                      : ""
                  }
                  ${
                    data?.status === "canceled"
                      ? "tw-bg-red-100 tw-text-red-800"
                      : ""
                  }
                  ${
                    data?.status === "rejected"
                      ? "tw-bg-gray-100 tw-text-gray-800"
                      : ""
                  }
                `}
                  >
                    {icon?.src && (
                      <Image
                        src={icon}
                        alt="status"
                        className="tw-w-4 tw-h-4"
                      />
                    )}
                    {data?.status}
                  </p>
                </div>
                <button
                  onClick={handleClick}
                  className="tw-text-[#44bcb7] hover:tw-text-[#338e89] tw-font-medium tw-text-sm sm:tw-text-base tw-underline tw-transition-all tw-duration-300 tw-ease-in-out"
                >
                  <FormattedMessage id="viewDetais" />
                </button>
              </div>

              {/* Location Details */}
              {(data?.unit?.title ||
                data?.unit?.sub_region_name ||
                data?.unit?.region_name) && (
                <div className="tw-mb-6">
                  <p className="tw-text-lg sm:tw-text-xl font-semibold tw-text-gray-800 tw-leading-relaxed">
                    {data?.unit?.title}, {data?.unit?.sub_region_name},{" "}
                    {data?.unit?.region_name}
                  </p>
                </div>
              )}

              {/* Reserved Status */}
              {data?.status === "reserved" && (
                <>
                  <hr className="tw-border-gray-200 tw-my-6" />
                  <div className="tw-bg-green-50 tw-border tw-border-green-200 tw-rounded-lg tw-p-4 sm:tw-p-6 tw-mb-6">
                    <h3 className="tw-flex tw-items-center tw-gap-2 tw-text-lg sm:tw-text-xl tw-font-semibold tw-text-green-800 tw-mb-3">
                      <Image
                        src={Check}
                        alt="checkIcon"
                        className="tw-w-5 tw-h-5 sm:tw-w-6 tw-h-6"
                      />
                      Reservation Confirmed!
                    </h3>
                    <p className="tw-text-green-700 tw-leading-relaxed">
                      Great news, Your down payment for this {data?.unit?.type}{" "}
                      has been successfully processed. You&apos;ll complete the
                      total cost on the first day of your reservation.
                    </p>
                  </div>
                </>
              )}

              {/* Negotiation Status */}
              {data?.status === "negotiation" && (
                <>
                  <hr className="tw-border-gray-200 tw-my-6" />
                  <div className="tw-space-y-4">
                    <NegotiationStatement />
                    {offers &&
                      offers?.length > 0 &&
                      offers.map((offer) => (
                        <div
                          key={offer.id}
                          className="tw-border tw-border-gray-200 tw-rounded-lg tw-p-4"
                        >
                          <Offer
                            unitImage={data?.unit?.main_image.url}
                            alt={data?.unit?.type}
                            offer={offer}
                            setOffers={setOffers}
                            setRefetch={setRefetch}
                          />
                        </div>
                      ))}
                  </div>
                </>
              )}

              {/* Pending Status */}
              {data?.status === "pending" && (
                <>
                  <hr className="tw-border-gray-200 tw-my-6" />
                  <div className="tw-bg-yellow-50 tw-border tw-border-yellow-200 tw-rounded-lg tw-p-4 sm:tw-p-6 tw-mb-6">
                    <h3 className="tw-text-lg sm:tw-text-xl tw-font-semibold tw-text-yellow-800 tw-mb-2">
                      Request Submitted
                    </h3>
                    <p className="tw-text-yellow-700 tw-leading-relaxed">
                      Awaiting Owner&apos;s Approval (Response will be within 2
                      hours).
                    </p>
                  </div>
                </>
              )}

              {/* Financial Summary */}
              {Object.keys(data).length > 0 && (
                <>
                  <hr className="tw-border-gray-200 tw-my-6" />
                  <div className="tw-mb-6">
                    <h3 className="tw-text-lg sm:tw-text-xl tw-font-semibold tw-text-gray-800 tw-mb-4">
                      Summary
                    </h3>
                    <div className="tw-bg-gray-50 tw-rounded-lg tw-p-2 sm:tw-p-4">
                      <FinancialSummary {...financialObj} />
                    </div>
                  </div>
                </>
              )}

              {/* Payment Section for Accepted Status */}
              {data?.status === "accepted" && (
                <div className="tw-mb-6">
                  <ReservationContext.Provider value={data}>
                    <PayNow
                      downPayment={data?.down_payment}
                      amountToPay={data?.amount_to_pay}
                      Refetch={setRefetch}
                    />
                  </ReservationContext.Provider>
                </div>
              )}

              <hr className="tw-border-gray-200 tw-my-6" />

              {/* Owner Section */}
              {data?.unit?.owner?.name ? (
                <>
                  <h3 className="tw-text-lg sm:tw-text-xl tw-font-semibold tw-text-gray-800 tw-mb-4">
                    Owner
                  </h3>
                  <div
                    className="tw-flex tw-items-center tw-gap-4 tw-p-4 tw-bg-gray-50 tw-rounded-lg tw-cursor-pointer hover:tw-bg-gray-100 tw-transition-colors tw-duration-200"
                    onClick={() =>
                      handleRedirectToOwnerProfile(data?.unit?.owner?.id)
                    }
                  >
                    <img
                      src={data?.unit?.owner?.image}
                      alt="owner_img"
                      className="tw-w-12 tw-h-12 sm:tw-w-16 sm:tw-h-16 tw-rounded-full tw-object-cover"
                    />
                    <div className="tw-flex-1">
                      <p className="tw-font-medium tw-text-gray-800 tw-text-sm sm:tw-text-base">
                        {data?.unit?.owner?.name}
                      </p>
                      {data?.status === "reserved" && (
                        <p className="tw-text-gray-600 tw-text-sm">
                          {data?.unit?.owner?.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="tw-h-20 sm:tw-h-20 tw-overflow-hidden">
                  <ShimmerThumbnail height="100%" rounded />
                </div>
              )}

              {/* Cancellation Policy */}
              {data?.status !== "canceled" && data?.status !== "rejected" && (
                <>
                  <hr className="tw-border-gray-200 tw-my-6" />
                  <div className="tw-mb-6">
                    <h3 className="tw-text-lg sm:tw-text-xl tw-font-semibold tw-text-gray-800 tw-mb-4">
                      Cancellation policy
                    </h3>
                    <div className="tw-space-y-4">
                      <p className="tw-text-gray-600 tw-leading-relaxed">
                        Please read our{" "}
                        <Link
                          href="/policy"
                          className="tw-text-blue-600 hover:tw-text-blue-800 tw-underline"
                        >
                          Refund Policy
                        </Link>{" "}
                        before cancellation.
                      </p>
                      <ModalComponent
                        isOpen={cancellationModal}
                        toggleModal={toggleCancellationModal}
                        modalBody={
                          <CancelReservationModal
                            reservationStatus={data?.status}
                            closeModalCb={toggleCancellationModal}
                            reservationId={id}
                          />
                        }
                      />
                      <button
                        onClick={() => handleCancelReservation(data?.id)}
                        className="tw-w-full sm:tw-w-auto tw-px-6 tw-py-3 tw-bg-red-600 hover:tw-bg-red-700 tw-text-white tw-font-medium tw-rounded-lg tw-transition-colors tw-duration-200"
                      >
                        <FormattedMessage id="cancel reservation" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Modals */}
        <ModalComponent
          isOpen={paymentStatusModal}
          toggleModal={togglePaymentModal}
          modalBody={
            <PaymentStatusModal
              status={paymentStatus}
              toggle={togglePaymentModal}
            />
          }
        />
        <ToastContainer />
      </div>
    </>
  );
}
