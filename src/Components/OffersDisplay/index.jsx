import React, { useEffect, useState } from "react";
import GuestMealsSelector from "../GuestMealsSelector";
import { getOffers } from "../../app/Apis/ReservationApis";
import { useRouter } from "next/router";
import OffersSelector from "../OffersItems";

const OffersDisplay = ({
  unitType,
  ageRanges,
  mealsOptions,
  adultsNumber,
  maxAdultsNumber,
  freeChildrenNumber,
  maxChildrenNumber,
  onRedeemOffer,
  onCloseOffersModal,
}) => {
  const [step, setStep] = useState(unitType === "chalet" ? 2 : 1);
  const [loading, setLoading] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    if (unitType === "chalet") {
      setLoading(true);
      getOffers(router.query.id)
        .then((res) => {
          setLoading(false);
          setOffers(res.data);
        })
        .catch((error) => {
          console.log(error);
          setError(error?.response.data.message);
          setLoading(false);
        });
    }
  }, [unitType, router.query.id]);

  if (loading) {
    return (
      <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-4 tw-min-h-[60vh]">
        <div className="tw-animate-spin tw-rounded-full tw-h-12 tw-w-12 tw-border-b-2 tw-border-[#44bcb7]"></div>
        <span className="tw-text-gray-600 tw-text-sm sm:tw-text-base">
          Loading...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-4 tw-min-h-[60vh]">
        <span className="tw-text-red-600 tw-text-sm sm:tw-text-base tw-text-center">
          {error}
        </span>
        <span className="tw-text-gray-600 tw-text-sm sm:tw-text-base">
          Please try again
        </span>
        <button className="tw-text-sm sm:tw-text-base tw-text-[#44bcb7] tw-bg-[#f5f5f5] border tw-border-[#44bcb7] tw-rounded-md tw-px-4 tw-py-2">
          <span className="tw-text-sm sm:tw-text-base">Try Again</span>
        </button>
      </div>
    );
  }

  const handleGuestMealsSelection = (queryString, summaryData) => {
    setLoading(true);
    getOffers(router.query.id, queryString)
      .then((res) => {
        setOffers(res.data);
        setLoading(false);
        setStep(2);
        setSummaryData(summaryData);
      })
      .catch((error) => {
        console.log(error);
        setError(error?.response.data.message);
        setLoading(false);
      });
  };

  const handleRedeemOffer = (offer) => {
    onCloseOffersModal();
    onRedeemOffer({}, {}, true, offer?.id, summaryData);
  };

  return (
    <>
      {step === 2 && unitType !== "chalet" && (
        <div className="tw-max-w-3xl tw-mx-auto">
          <button
            className="tw-inline-flex tw-items-center tw-border tw-border-indigo-300 tw-px-3 tw-py-1.5 tw-rounded-md tw-bg-[linear-gradient(180deg,_#44BCB7_-16.5%,_#2396CC_54.7%)] hover:tw-shadow-lg tw-mb-4 tw-text-white tw-transition-all tw-ease-in-out tw-duration-300"
            onClick={() => setStep(1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="tw-h-6 tw-w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              ></path>
            </svg>
            <span className="tw-ml-1 tw-font-bold tw-text-lg">Back</span>
          </button>
        </div>
      )}

      {step === 1 ? (
        <GuestMealsSelector
          mealsOptions={mealsOptions}
          ageRanges={ageRanges}
          adultsNumber={adultsNumber}
          maxAdultsNumber={maxAdultsNumber}
          freeChildrenNumber={freeChildrenNumber}
          maxChildrenNumber={maxChildrenNumber}
          buttonText="Check Offers"
          onGuestMealsChange={() => {}}
          onSelectGuestMeals={handleGuestMealsSelection}
        />
      ) : (
        <OffersSelector offers={offers} onContinue={handleRedeemOffer} />
      )}
    </>
  );
};

export default OffersDisplay;
