import React from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import ReactPaginate from "react-paginate";
import "./pagination.css"

const Pagination = ({ handlePagination, meta }) => {
  return (
    <ReactPaginate
      previousLabel={<ChevronLeft size={15} />}
      nextLabel={<ChevronRight size={15} />}
      breakLabel="..."
      breakClassName="break-me"
      pageCount={meta.last_page}
      containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
      activeClassName="active"
      forcePage={meta.current_page - 1}
      onPageChange={(page) => handlePagination(page)}
    />
  );
};

export default Pagination;
