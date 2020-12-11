import React from "react";
import { CoursePart } from "../types";

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map(({name, exerciseCount}) => (
        <p key={name}>{name} {exerciseCount}</p>
      ))}
    </>
  )
}

export default Content;