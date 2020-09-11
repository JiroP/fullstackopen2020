import React from "react";
import Weather from "./Weather";

const CountryDetails = (props) => {
  return (
    <div>
      <h1>{props.country.name}</h1>
      <p>
        capital {props.country.capital}
        <br />
        population {props.country.population}
      </p>
      <h2>languages</h2>
      <ul>
        {props.country.languages.map(({ name, iso639_2 }) => (
          <li key={iso639_2}>{name}</li>
        ))}
      </ul>
      <img
        src={props.country.flag}
        alt={`${props.country.name} flag`}
        width="200"
        height="133"
      />
      <h2>weather in {props.country.capital}</h2>
      <Weather city={props.country.capital} />
    </div>
  );
};

export default CountryDetails;
