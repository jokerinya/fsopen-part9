import { CoursePart } from "../types";

interface TotalProps {
  courseParts: Array<CoursePart>;
}

const Total = ({ courseParts }: TotalProps) => {
  return (
    <p>Number of exercises {courseParts.reduce((acc, curEl) => acc + curEl.exerciseCount, 0)}</p>
  );
};

export default Total;
