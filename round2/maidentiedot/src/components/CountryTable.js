import React from "react";
import CountryLine from "./CountryLine";

const CountryTable = ({ countries, setShowCountry }) => {
  return (
    <table>
      <tbody>
        {countries.map((country) => (
          <CountryLine
            key={country.numericCode}
            name={country.name}
            handleClick={() => setShowCountry(country.name)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default CountryTable;
