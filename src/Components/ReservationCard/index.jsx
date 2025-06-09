import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import Like from "../../../public/assets/like.svg";
import Image from "next/image";
import { getIcon } from "../../app/utils";
const ReservationCard = ({ data }) => {
  const router = useRouter();
  const getDayMonth = (fullDatetime) => {
    const month = fullDatetime.slice(5, 7);
    const day = fullDatetime.slice(8, 10);
    return `${month}-${day}`;
  };
  const icon = getIcon(data.status);
  const handleNavigateToDetails = (id) => {
    router.push(`/reservations/${id}`);
  };

  return (
    <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-overflow-hidden tw-transition-shadow tw-duration-200 hover:tw-shadow-lg">
      <div
        className="tw-flex tw-flex-col lg:tw-flex-row tw-cursor-pointer"
        onClick={() => handleNavigateToDetails(data.id)}
      >
        {/* Image Section */}
        <div className="tw-w-full lg:tw-w-64 xl:tw-w-80 tw-h-48 lg:tw-h-40 xl:tw-h-48 tw-flex-shrink-0">
          <img
            src={data?.unit?.main_image?.url}
            alt="main image"
            className="tw-w-full tw-h-full tw-object-cover tw-rounded-t-lg lg:tw-rounded-t-none lg:tw-rounded-l-lg"
          />
        </div>

        {/* Content Section */}
        <div className="tw-flex tw-flex-1 tw-flex-col lg:tw-flex-row tw-p-4 sm:tw-p-6">
          {/* Main Information */}
          <div className="tw-flex-1 tw-space-y-3 sm:tw-space-y-4">
            {/* Unit Type */}
            <div>
              <p className="tw-text-xs sm:tw-text-sm tw-font-medium tw-text-[#44bcb7] tw-uppercase tw-tracking-wide">
                {data?.unit?.type}
              </p>
            </div>

            {/* Title */}
            <h3 className="tw-text-lg sm:tw-text-xl lg:tw-text-2xl tw-font-semibold tw-text-gray-800 tw-leading-tight">
              {data?.unit?.title}
            </h3>

            {/* Details */}
            <div className="tw-text-sm sm:tw-text-base tw-text-gray-600 tw-space-y-1 sm:tw-space-y-0">
              <div className="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-center tw-gap-1 sm:tw-gap-3">
                <span className="tw-font-medium">
                  {data?.days} <FormattedMessage id="nights" />
                </span>
                <span className="tw-text-xs sm:tw-text-sm tw-text-gray-500">
                  ( <FormattedMessage id="from" />{" "}
                  <span className="tw-font-medium tw-text-gray-700">
                    {getDayMonth(data?.from)}
                  </span>{" "}
                  <FormattedMessage id="to" />{" "}
                  <span className="tw-font-medium tw-text-gray-700">
                    {getDayMonth(data?.to)}
                  </span>{" "}
                  )
                </span>
              </div>
            </div>

            {/* Total Cost */}
            <div className="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-center tw-gap-2 sm:tw-gap-4 tw-text-sm sm:tw-text-base">
              <span className="tw-text-gray-600">
                <FormattedMessage id="totalCost" />
              </span>
              <span className="tw-font-semibold tw-text-lg sm:tw-text-xl tw-text-gray-800">
                {data?.total_price} <FormattedMessage id="LE" />
              </span>
            </div>
          </div>

          {/* Status Section */}
          <div className="tw-flex tw-flex-row lg:tw-flex-col tw-items-center lg:tw-items-end tw-justify-between lg:tw-justify-between tw-mt-4 lg:tw-mt-0 tw-lg:tw-ml-6">
            {/* Review Button */}
            {data?.is_reviewed && (
              <button className="tw-flex tw-items-center tw-gap-2 tw-px-3 tw-py-2 tw-text-sm tw-text-blue-600 hover:tw-text-blue-800 tw-font-medium tw-rounded-lg hover:tw-bg-blue-50 tw-transition-colors tw-duration-200">
                <span>
                  <FormattedMessage id="reviewYourRent" />
                </span>
                <Image src={Like} alt="like" className="tw-w-4 tw-h-4" />
              </button>
            )}

            {/* Status Badge */}
            <div
              className={`tw-flex tw-items-center tw-gap-2 tw-px-3 tw-py-1 tw-rounded-full tw-text-sm tw-font-medium
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
              <Image src={icon} alt={data?.status} className="tw-w-4 tw-h-4" />
              <span className="tw-capitalize">{data?.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Negotiation Message */}
      {data?.status === "negotiation" && (
        <div className="tw-bg-blue-50 tw-border-t tw-border-blue-100 tw-p-4 sm:tw-p-6">
          <p className="tw-text-sm sm:tw-text-base tw-text-blue-800 tw-font-medium">
            The owner has sent you suggestions, check them now.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReservationCard;
