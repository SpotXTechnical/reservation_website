import React, { useState } from "react";

const ReservationsPagination = ({ lastPage, callBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = Array.from({ length: lastPage }, (_, i) => i + 1);
  const handlePageChange = (pageNumber) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setCurrentPage(pageNumber);
    callBack(pageNumber);
  };
  return (
    <nav aria-label="Pagination Navigation" className="tw-pt-6 sm:tw-pt-8">
      <ul className="tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-1 sm:tw-gap-2">
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className="tw-inline-flex">
            <button
              className={`tw-inline-flex tw-items-center tw-justify-center tw-min-w-10 tw-h-10 sm:tw-min-w-12 sm:tw-h-12 tw-px-3 sm:tw-px-4 tw-text-sm sm:tw-text-base tw-font-medium tw-rounded-lg tw-transition-all tw-duration-200 tw-border
                ${
                  currentPage === pageNumber
                    ? "tw-bg-[#44bcb7] tw-text-white tw-border-[#44bcb7] tw-shadow-md"
                    : "tw-bg-white tw-text-gray-700 tw-border-gray-300 hover:tw-bg-gray-50 hover:tw-border-gray-400 hover:tw-text-gray-900"
                }
                tw-cursor-pointer tw-select-none focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-ring-offset-2
              `}
              onClick={() => handlePageChange(pageNumber)}
              aria-current={currentPage === pageNumber ? "page" : undefined}
              aria-label={`Go to page ${pageNumber}`}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ReservationsPagination;
