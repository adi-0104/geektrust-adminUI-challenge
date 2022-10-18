import React, { useState } from "react";
import "./TableFeatures.css";
const TableFeatures = ({ performSearch, deleteCheckedUsers }) => {
  const [searchKey, setSearchKey] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const debounceInterval = 500;

  //Handle search query
  const debouncedSearch = (event, timeout = debounceInterval) => {
    if (debounceTimeout) clearTimeout(debounceTimeout);

    const key = event.target.value;
    setSearchKey(key);

    const timerId = setTimeout(() => {
      performSearch(key);
    }, timeout);

    setDebounceTimeout(timerId);
  };

  //handle delete button
  const handleDeleteSelectedButton = () => {
    if (window.confirm("Are you sure you want to delete selected users ?"))
      deleteCheckedUsers();
  };
  
  return (
    <div className="d-flex flex-row justify-content-evenly align-items-center mb-3">
      <div className="input-group flex-nowrap search-box">
        <input
          type="text"
          className="form-control "
          placeholder="Search User"
          onChange={debouncedSearch}
          value={searchKey}
          aria-label="Search"
        />
        <div className="input-group-text" id="addon-wrapping">
          <i className="bi bi-search"></i>
        </div>
      </div>
      <div className="delete-selected-wrapper">
        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={handleDeleteSelectedButton}
        >
          <i className="bi bi-trash-fill"></i> Selected
        </button>
      </div>
    </div>
  );
};

export default TableFeatures;
