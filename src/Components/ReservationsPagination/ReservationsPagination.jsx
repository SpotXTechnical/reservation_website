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
    <nav aria-label="..." className="pt-4 ">
      <ul className="pagination pagination-lg justify-content-center">
        {pageNumbers.map((pageNumber) => (
          <li
            className={`page-item ${
              currentPage === pageNumber ? "active" : ""
            }`}
            aria-current="page"
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            role="button"
          >
            <span
              className={`page-link pagination_not_active_link  ${
                currentPage === pageNumber ? "pagination_active_link" : ""
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

export default ReservationsPagination;
