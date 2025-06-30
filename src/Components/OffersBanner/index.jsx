import React from "react";

const OffersBanner = ({
  title = "Check Offers ",
  subtitle = "Check out the latest offers available for this property.",
  onClick = () => {},
  className = "",
}) => {
  return (
    <div
      className={`tw-w-full tw-bg-gray-50 tw-border-2  tw-rounded-lg tw-p-4 tw-cursor-pointer tw-transition-all tw-duration-200 hover:tw-bg-gray-100 hover:tw-border-cyan-400 ${className}`}
      onClick={onClick}
    >
      <div className="tw-flex tw-items-center tw-justify-between">
        <div className="tw-flex tw-items-center tw-gap-3">
          {/* Warning Icon */}
          <div className="tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-flex-shrink-0">
            <svg
              viewBox="0 0 26 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.50004 10.0007H9.51171M16.5 17.0007H16.5117M17.6667 8.83398L8.33337 18.1673M7.5561 3.9558C8.49391 3.88096 9.38421 3.51218 10.1003 2.90197C11.7712 1.47799 14.2289 1.47799 15.8998 2.90197C16.6159 3.51218 17.5062 3.88096 18.444 3.9558C20.6324 4.13044 22.3703 5.86825 22.5449 8.05671C22.6197 8.99452 22.9885 9.88482 23.5987 10.6009C25.0227 12.2718 25.0227 14.7295 23.5987 16.4004C22.9885 17.1165 22.6197 18.0068 22.5449 18.9446C22.3703 21.133 20.6324 22.8709 18.444 23.0455C17.5062 23.1203 16.6159 23.4891 15.8998 24.0993C14.2289 25.5233 11.7712 25.5233 10.1003 24.0993C9.38421 23.4891 8.49391 23.1203 7.5561 23.0455C5.36764 22.8709 3.62983 21.133 3.45519 18.9446C3.38035 18.0068 3.01157 17.1165 2.40136 16.4004C0.977378 14.7295 0.977378 12.2718 2.40136 10.6009C3.01157 9.88482 3.38035 8.99452 3.45519 8.05671C3.62983 5.86825 5.36764 4.13044 7.5561 3.9558ZM10.0834 10.0007C10.0834 10.3228 9.82221 10.584 9.50004 10.584C9.17787 10.584 8.91671 10.3228 8.91671 10.0007C8.91671 9.67848 9.17787 9.41732 9.50004 9.41732C9.82221 9.41732 10.0834 9.67848 10.0834 10.0007ZM17.0834 17.0007C17.0834 17.3228 16.8222 17.584 16.5 17.584C16.1779 17.584 15.9167 17.3228 15.9167 17.0007C15.9167 16.6785 16.1779 16.4173 16.5 16.4173C16.8222 16.4173 17.0834 16.6785 17.0834 17.0007Z"
                stroke="#2396CC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="tw-flex tw-flex-col">
            <h3 className="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-1">
              {title}
            </h3>
            <p className="tw-text-sm tw-text-gray-600">{subtitle}</p>
          </div>
        </div>

        {/* Chevron Right Arrow */}
        <div className="tw-flex-shrink-0 tw-ml-4">
          <svg
            className="tw-w-5 tw-h-5 tw-text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default OffersBanner;
