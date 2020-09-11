import React from "react";

const CountryLine = ({ name, handleClick }) => (
  <tr>
    <td>{name}</td>
    <td>
      <button name="show" onClick={handleClick}>show</button>
    </td>
  </tr>
);

export default CountryLine;
