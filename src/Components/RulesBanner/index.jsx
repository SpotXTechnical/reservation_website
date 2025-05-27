import React from "react";

const RulesBanner = ({
  title = "Rules",
  subtitle = "By reserving you admit that you've approved the unit rules.",
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
          <div className="tw-w-8 tw-h-8 tw-bg-orange-100 tw-border-2 tw-border-orange-300 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-flex-shrink-0">
            <span className="tw-text-orange-600 tw-text-sm tw-font-bold">
              !
            </span>
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

export default RulesBanner;
