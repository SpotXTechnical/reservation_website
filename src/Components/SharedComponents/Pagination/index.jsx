import React, { useState } from "react";

const Pagination = ({ links }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Handle page number click
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle next/previous button clicks
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      {/* Render paginated data */}
      <ul>
        {links[currentPage].map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      {/* Render pagination controls */}
      <div>
        <button onClick={handlePrevPage} disabled={!links[currentPage - 1]}>
          Previous
        </button>
        {Object.keys(links).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handleClick(pageNumber)}
            disabled={currentPage === parseInt(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={!links[currentPage + 1]}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
