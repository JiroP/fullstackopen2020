import React from "react";
import CountryLine from "./CountryLine";
import CountryDetails from "./CountryDetails";

const Countries = ({ countries }) => {
  const nOfCountries = countries.length;

  if (nOfCountries === 1) {
    return <CountryDetails country={countries[0]} />;
  } else if (nOfCountries <= 10) {
    return countries.map((country) => (
      <CountryLine key={country.numericCode} name={country.name} />
    ));
  } else {
    return <div>Too many matches, specify another filter</div>;
  }
};

export default Countries;
