import React from "react";
import CountryDetails from "./CountryDetails";
import CountryTable from "./CountryTable";

const Countries = ({ countries, setShowCountry }) => {
  const nOfCountries = countries.length;

  if (nOfCountries === 1) {
    return <CountryDetails country={countries[0]} />;
  } else if (nOfCountries <= 10) {
    return <CountryTable countries={countries} setShowCountry={setShowCountry} />;
  } else {
    return <div>Too many matches, specify another filter</div>;
  }
};

export default Countries;
