import React from "react";

const RulesDisplay = ({ rules = [], onGotIt = () => {} }) => {
  const getCardBorderColor = (title) => {
    return "tw-border-orange-200 hover:tw-border-orange-300";
  };

  const getNumberBadgeColor = (title) => {
    return "tw-bg-orange-100 tw-text-orange-700 tw-border-orange-200";
  };

  if (!rules.length) {
    return (
      <div className="tw-text-center tw-py-8 tw-text-gray-500">
        No rules to display
      </div>
    );
  }

  return (
    <div className="tw-w-full tw-max-w-4xl tw-mx-auto tw-p-4">
      <div className="tw-mb-6">
        <h2 className="tw-text-2xl tw-font-bold tw-text-gray-900 tw-mb-2">
          Property Rules & Guidelines
        </h2>
        <p className="tw-text-gray-600">
          Please review these important rules before you reserve.
        </p>
      </div>

      <div className="tw-grid tw-gap-4 sm:tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2">
        {rules.map((rule, index) => (
          <div
            key={rule.id}
            className={`tw-bg-white tw-rounded-lg tw-border-2 tw-p-6 tw-shadow-sm hover:tw-shadow-md tw-transition-all tw-duration-200 ${getCardBorderColor(
              rule.title
            )}`}
          >
            <div className="tw-flex tw-items-center tw-gap-3 tw-mb-4">
              <div
                className={`tw-w-8 tw-h-8 tw-rounded-full tw-border-2 tw-flex tw-items-center tw-justify-center tw-font-bold tw-text-sm tw-flex-shrink-0 ${getNumberBadgeColor(
                  rule.title
                )}`}
              >
                {index + 1}
              </div>
              <h3 className="tw-text-lg tw-font-semibold tw-text-gray-900 tw-leading-tight">
                {rule.title}
              </h3>
            </div>

            <div className="tw-space-y-2">
              {rule.values.map((value, valueIndex) => (
                <div
                  key={valueIndex}
                  className="tw-flex tw-items-start tw-gap-2 tw-text-gray-700"
                >
                  <div className="tw-w-2 tw-h-2 tw-bg-gray-400 tw-rounded-full tw-mt-2 tw-flex-shrink-0"></div>
                  <p className="tw-text-sm tw-leading-relaxed">{value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="tw-mt-8 tw-p-4 tw-bg-gray-50 tw-rounded-lg tw-border">
        <div className="tw-flex tw-items-center tw-gap-2 tw-mb-2">
          <div className="tw-w-6 tw-h-6 tw-bg-amber-100 tw-border-2 tw-border-amber-200 tw-rounded-full tw-flex tw-items-center tw-justify-center">
            <span className="tw-text-amber-600 tw-text-xs tw-font-bold">!</span>
          </div>
          <h4 className="tw-font-semibold tw-text-gray-900">
            Important Notice
          </h4>
        </div>
        <p className="tw-text-sm tw-text-gray-600">
          Violation of these rules may result in additional fees, loss of
          security deposit, or immediate cancellation of your reservation
          without refund.
        </p>
      </div>
      <button
        className="tw-mt-4 tw-w-full tw-bg-cyan-600 hover:tw-bg-cyan-700 tw-text-white tw-py-2 tw-rounded-lg"
        onClick={onGotIt}
      >
        Got it
      </button>
    </div>
  );
};

export default RulesDisplay;
