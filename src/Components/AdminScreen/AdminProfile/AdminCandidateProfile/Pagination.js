import React from "react";
import "./AdminCandidateProfile.css"; // Import your CSS file

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const renderPageNumbers = () => {
    if (nPages <= 10) {
      return pageNumbers.map((pgNumber) => (
        <li
          key={pgNumber}
          className={`page-item ${currentPage === pgNumber ? "active" : ""} `}
        >
          <h6 onClick={() => setCurrentPage(pgNumber)} className="page-link">
            {pgNumber}
          </h6>
        </li>
      ));
    } else {
      // Display dotted steps for more than 10 pages
      const firstPage = currentPage <= 5 ? 1 : currentPage - 4;
      const lastPage = currentPage + 5 > nPages ? nPages : currentPage + 5;

      return (
        <>
          {currentPage > 5 && (
            <>
              <li className="page-item">
                <h6 onClick={() => setCurrentPage(1)} className="page-link">
                  1
                </h6>
              </li>
              <li className="dotted-item">...</li>
            </>
          )}

          {pageNumbers.slice(firstPage - 1, lastPage).map((pgNumber) => (
            <li
              key={pgNumber}
              className={`page-item ${
                currentPage === pgNumber ? "active" : ""
              } `}
            >
              <h6
                onClick={() => setCurrentPage(pgNumber)}
                className="page-link"
              >
                {pgNumber}
              </h6>
            </li>
          ))}

          {currentPage + 5 < nPages && (
            <>
              <li className="dotted-item">.  .  .</li>
              <li className="page-item">
                <h6
                  onClick={() => setCurrentPage(nPages)}
                  className="page-link"
                >
                  {nPages}
                </h6>
              </li>
            </>
          )}
        </>
      );
    }
  };

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <h6 className="page-link" onClick={goToPrevPage}>
          {"<<"} Previous
          </h6>
        </li>

        {renderPageNumbers()}

        <li className={`page-item ${currentPage === nPages ? "disabled" : ""}`}>
          <h6 className="page-link" onClick={goToNextPage}>
            Next {">>"}
          </h6>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
