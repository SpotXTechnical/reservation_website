import { useState } from "react";

const OffersSelector = ({ offers = [], onContinue }) => {
  const [selectedOfferId, setSelectedOfferId] = useState(offers[0]?.id || null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatPrice = (price) => {
    return price.toLocaleString("en-US");
  };

  const handleContinue = () => {
    const selectedOffer = offers.find((offer) => offer.id === selectedOfferId);
    if (onContinue && selectedOffer) {
      onContinue(selectedOffer);
    }
  };

  if (!offers || offers.length === 0) {
    return (
      <div className="tw-p-6 tw-text-center tw-text-gray-500">
        No offers available
      </div>
    );
  }

  return (
    <div className="tw-w-full tw-max-w-xl tw-mx-auto tw-p-3 sm:tw-p-4">
      <div className="tw-space-y-2 sm:tw-space-y-3">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`tw-relative tw-p-3 sm:tw-p-4 tw-rounded-xl tw-border-2 tw-cursor-pointer tw-transition-all tw-duration-300 tw-shadow-sm ${
              selectedOfferId === offer.id
                ? "tw-border-teal-400 tw-bg-teal-50 tw-shadow-md tw-ring-2 tw-ring-teal-100"
                : "tw-border-gray-200 tw-bg-white hover:tw-border-gray-300 hover:tw-shadow-md"
            }`}
            onClick={() => setSelectedOfferId(offer.id)}
          >
            {/* Radio button indicator */}
            <div className="tw-absolute tw-left-3 sm:tw-left-4 tw-top-4 sm:tw-top-1/2 sm:tw-transform sm:-tw-translate-y-1/2">
              <div
                className={`tw-w-4 tw-h-4 sm:tw-w-5 sm:tw-h-5 tw-rounded-full tw-border-2 tw-flex tw-items-center tw-justify-center tw-transition-all tw-duration-200 ${
                  selectedOfferId === offer.id
                    ? "tw-border-teal-500 tw-bg-teal-500 tw-shadow-sm"
                    : "tw-border-gray-300 tw-bg-white"
                }`}
              >
                {selectedOfferId === offer.id && (
                  <div className="tw-w-1.5 tw-h-1.5 sm:tw-w-2 sm:tw-h-2 tw-rounded-full tw-bg-white"></div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="tw-ml-7 sm:tw-ml-8">
              {/* Mobile Layout */}
              <div className="tw-block sm:tw-hidden">
                <div className="tw-flex tw-gap-4 tw-mb-2">
                  <div className="tw-flex tw-flex-col">
                    <span className="tw-text-xs tw-font-semibold tw-text-gray-700 tw-mb-0.5">
                      Check-In
                    </span>
                    <span className="tw-text-sm tw-font-medium tw-text-gray-900">
                      {formatDate(offer.from)}
                    </span>
                  </div>
                  <div className="tw-flex tw-flex-col">
                    <span className="tw-text-xs tw-font-semibold tw-text-gray-700 tw-mb-0.5">
                      Check-out
                    </span>
                    <span className="tw-text-sm tw-font-medium tw-text-gray-900">
                      {formatDate(offer.to)}
                    </span>
                  </div>
                </div>
                <div className="tw-mb-3">
                  <span className="tw-text-xs tw-text-gray-500">
                    {offer.days_count} Night{offer.days_count !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="tw-flex tw-items-center tw-gap-2">
                  <span className="tw-text-lg tw-font-bold tw-text-gray-900">
                    {formatPrice(offer.total_price_offer)} LE
                  </span>
                  {offer.total_price !== offer.total_price_offer && (
                    <span className="tw-text-sm tw-text-red-500 tw-line-through">
                      {formatPrice(offer.total_price)} LE
                    </span>
                  )}
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="tw-hidden sm:tw-flex sm:tw-items-center sm:tw-justify-between tw-gap-4">
                <div className="tw-flex tw-gap-8">
                  <div className="tw-flex tw-flex-col tw-min-w-0">
                    <span className="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-0.5">
                      Check-In
                    </span>
                    <span className="tw-text-sm tw-text-gray-600">
                      {formatDate(offer.from)}
                    </span>
                  </div>
                  <div className="tw-flex tw-flex-col tw-min-w-0">
                    <span className="tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-0.5">
                      Check-out
                    </span>
                    <span className="tw-text-sm tw-text-gray-600">
                      {formatDate(offer.to)}
                    </span>
                  </div>
                </div>

                <div className="tw-flex tw-flex-col tw-items-end tw-gap-1">
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <span className="tw-text-sm tw-text-gray-600">
                      {offer.days_count} Night
                      {offer.days_count !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <span className="tw-text-lg tw-font-bold tw-text-gray-900">
                      {formatPrice(offer.total_price_offer)} LE
                    </span>
                    {offer.total_price !== offer.total_price_offer && (
                      <span className="tw-text-sm tw-text-red-500 tw-line-through">
                        {formatPrice(offer.total_price)} LE
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={!selectedOfferId}
        className="tw-w-full tw-mt-4 sm:tw-mt-6 tw-py-3.5 tw-px-4 tw-bg-gradient-to-r tw-from-cyan-500 tw-to-blue-500 tw-text-white tw-font-semibold tw-rounded-xl tw-transition-all tw-duration-300 tw-shadow-lg hover:tw-shadow-xl hover:tw-from-cyan-600 hover:tw-to-blue-600 hover:tw-scale-[1.02] active:tw-scale-[0.98] disabled:tw-opacity-50 disabled:tw-cursor-not-allowed disabled:hover:tw-shadow-lg disabled:hover:tw-scale-100 tw-text-base sm:tw-text-lg"
      >
        Continue
      </button>
    </div>
  );
};

export default OffersSelector;
