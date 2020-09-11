import React from "react";

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
      <img src={props.country.flag} alt={`${props.country.name} flag`} />
    </div>
  );
};

export default CountryDetails;
