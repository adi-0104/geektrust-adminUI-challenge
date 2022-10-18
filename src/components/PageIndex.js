import React from "react";
import "./PageIndex.css";
const PageIndex = ({
  totalFilteredUsers,
  usersPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];

  for (
    let index = 1;
    index <= Math.ceil(totalFilteredUsers / usersPerPage);
    index++
  ) {
    pageNumbers.push(index);
  }
  const firstPage = pageNumbers[0];
  const lastPage = pageNumbers[pageNumbers.length - 1];

  //Paginate based on targetClicks
  const handleStartButton = () => {
    setCurrentPage(firstPage);
  };

  const handlePrevButton = () => {
    setCurrentPage(currentPage - 1);
  };

  const handlePageNumberButton = (event) => {
    let indexNumber = event.target.name;
    setCurrentPage(Number(indexNumber));
  };

  const handleNextButton = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleEndButton = () => {
    setCurrentPage(lastPage);
  };

  return (
    <div className="d-flex flex-row justify-content-center align-items-center">
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-light page-buttons"
          name="start"
          onClick={handleStartButton}
        >
          <i className="bi bi-chevron-bar-left"></i>
        </button>
        <button
          type="button"
          className="btn btn-light"
          name="prev"
          onClick={handlePrevButton}
          disabled={currentPage === firstPage ? true : false}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <div className="btn-group" onClick={handlePageNumberButton}>
          {pageNumbers.map((number, idx) => (
            <button
              key={idx}
              className={
                number === currentPage ? "btn btn-dark" : "btn btn-light"
              }
              aria-current="page"
              name={number}
            >
              {number}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-light"
          name="next"
          onClick={handleNextButton}
          disabled={currentPage === lastPage ? true : false}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
        <button
          type="button"
          className="btn btn-light"
          name="end"
          onClick={handleEndButton}
        >
          <i className="bi bi-chevron-bar-right"></i>
        </button>
      </div>
    </div>
  );
};

export default PageIndex;
