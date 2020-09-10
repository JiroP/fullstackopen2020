import React from "react";
import Person from "./Person";

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map(({ name, number }) => (
        <Person key={name} name={name} number={number} />
      ))}
    </>
  );
};

export default Persons;
