import React from "react";
import "./Person.css";

const Person = ({ name, number, handleDelete }) => (
  <div>
    <p className="person">
      {name} {number}
    </p>
    <button className="delete" onClick={handleDelete}>
      delete
    </button>
  </div>
);

export default Person;
