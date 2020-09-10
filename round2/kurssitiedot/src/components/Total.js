import React from "react";

const Total = ({ parts }) => {
  const total = parts.reduce((acc, part) => acc + part.exercises, 0);

  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  );
};

export default Total;
