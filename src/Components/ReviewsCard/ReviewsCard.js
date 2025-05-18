"use client";
import ReactStars from "react-rating-stars-component";

const ReviewsCard = ({ imgSrc, name, subTitle, rate, review }) => {
  const avatar = "/assets/avatar.png";

  return (
    <div className="tw-bg-white tw-shadow-[0px_0px_9px_-1px_rgba(0,_0,_0,_0.1)] tw-rounded-2xl tw-p-4 sm:tw-p-6 tw-flex tw-flex-col tw-justify-between tw-h-full tw-min-h-[120px]">
      <div>
        {/* Header section - stack on mobile, side by side on desktop */}
        <div className="tw-flex tw-flex-col sm:tw-flex-row sm:tw-justify-between sm:tw-items-start tw-gap-3 sm:tw-gap-4">
          {/* User info */}
          <div className="tw-flex tw-items-center tw-gap-3 tw-flex-1 tw-min-w-0">
            <img
              src={imgSrc || avatar}
              alt="Reviewer"
              className="tw-w-10 tw-h-10 sm:tw-w-12 sm:tw-h-12 tw-rounded-full tw-object-cover tw-flex-shrink-0"
            />
            <div className="tw-min-w-0 tw-flex-1">
              <p className="tw-text-base sm:tw-text-lg tw-font-semibold tw-text-gray-900 tw-truncate">
                {name}
              </p>
              <p className="tw-text-xs sm:tw-text-sm tw-text-gray-500 tw-truncate">
                {subTitle}
              </p>
            </div>
          </div>

          {/* Rating - responsive sizing */}
          <div className="tw-flex tw-justify-center sm:tw-justify-end tw-flex-shrink-0">
            <ReactStars
              count={5}
              edit={false}
              size={window.innerWidth < 640 ? 16 : 20}
              value={rate}
              activeColor="#FDB022"
              classNames="tw-flex tw-gap-1"
            />
          </div>
        </div>

        {/* Review content */}
        <div className="tw-mt-4">
          <p className="tw-text-gray-700 tw-text-sm sm:tw-text-base tw-leading-relaxed tw-line-clamp-4">
            {review}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewsCard;
