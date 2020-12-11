import React from "react";
import { CoursePart } from "../types";
import Part from "./Part";

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map((coursePart) => (
        <Part key={coursePart.name} coursePart={coursePart} />
      ))}
    </>
  )
}

export default Content;