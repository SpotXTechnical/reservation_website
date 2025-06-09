import React, { useState } from "react";

const Pagination = ({ lastPage, callBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = Array.from({ length: lastPage }, (_, i) => i + 1);
  const handlePageChange = (pageNumber) => {
    if (currentPage === pageNumber) return;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setCurrentPage(pageNumber);
    callBack(pageNumber);
  };

  return (
    <nav aria-label="..." className="tw-mx-auto">
      <ul className="tw-flex tw-justify-center tw-items-center tw-space-x-2 tw-flex-wrap tw-gap-2">
        {pageNumbers.map((pageNumber) => (
          <li
            className={`tw-list-none ${
              currentPage === pageNumber ? "tw-scale-110" : ""
            }`}
            aria-current="page"
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            role="button"
          >
            <span
              className={`tw-inline-flex tw-items-center tw-justify-center tw-w-10 tw-h-10 tw-text-sm tw-font-medium tw-rounded-lg tw-cursor-pointer tw-transition-all tw-duration-200 tw-border ${
                currentPage === pageNumber
                  ? "tw-bg-[#44bcb7] tw-text-white tw-border-[#44bcb7] tw-shadow-md"
                  : "tw-bg-white tw-text-gray-700 tw-border-gray-300 hover:tw-bg-blue-50 hover:tw-border-[#3cb0aa] hover:tw-text-[#3cb0aa]"
              }`}
            >
              {pageNumber}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
