import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [showCountry, setShowCountry] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
    setShowCountry("");
  };

  const shownCountries = showCountry
    ? countries.filter(
        ({ name }) => name.toLowerCase() === showCountry.toLowerCase()
      )
    : countries.filter(({ name }) =>
        name.toLowerCase().includes(searchString.toLowerCase())
      );

  return (
    <div>
      <Filter
        searchString={searchString}
        handleSearchChange={handleSearchChange}
      />
      <Countries
        countries={shownCountries}
        showCountry={showCountry}
        setShowCountry={setShowCountry}
      />
    </div>
  );
};

export default App;
