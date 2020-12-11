interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseDesc extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartBaseDesc {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseDesc {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBaseDesc {
  name: "Must go even deeper";
  exerciseIsDumb: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;