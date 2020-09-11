import React from "react";

const Filter = ({ searchString, handleSearchChange }) => (
  <div>
    find countries{" "}
    <input value={searchString} onChange={handleSearchChange} />
  </div>
);

export default Filter;
