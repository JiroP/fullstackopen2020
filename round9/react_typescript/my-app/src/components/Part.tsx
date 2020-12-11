import React from "react";
import { CoursePart } from "../types";

const Part: React.FC<{coursePart: CoursePart}> = ({ coursePart }) => {
  switch (coursePart.name) {
    case "Deeper type usage":
      return <p>{coursePart.name} {coursePart.exerciseCount} {coursePart.description} {coursePart.exerciseSubmissionLink}</p>
    case "Fundamentals":
      return <p>{coursePart.name} {coursePart.exerciseCount} {coursePart.description}</p>
    case "Using props to pass data":
      return <p>{coursePart.name} {coursePart.exerciseCount} {coursePart.groupProjectCount}</p>
    case "Must go even deeper":
      return <p>{coursePart.name} {coursePart.exerciseCount} {coursePart.description} {coursePart.exerciseIsDumb}</p>
  }
} 

export default Part;