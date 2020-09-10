import React from "react";

const Filter = ({ searchString, handleSearchChange }) => (
  <div>
    filter shown with{" "}
    <input value={searchString} onChange={handleSearchChange} />
  </div>
);

export default Filter;
