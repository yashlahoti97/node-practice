import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
const Pagination = (props) => {
  //
  const { itemCount, pageSize, onPageChange, currentPage } = props;
  const pageCount = Math.ceil(itemCount / pageSize);
  const pages = _.range(1, pageCount + 1);
  if (pageCount === 1) return null;
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={currentPage === page ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
