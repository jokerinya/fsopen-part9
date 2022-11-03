import { CoursePart } from "../types";

interface PartProps {
  course: CoursePart;
}

const Part = ({ course }: PartProps) => {
  switch (course.type) {
    case "normal":
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <i>{course.description}</i>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <div>project exercises {course.groupProjectCount}</div>
        </div>
      );
    case "submission":
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <i>{course.description}</i>
          <div>submit to {course.exerciseSubmissionLink}</div>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <i>{course.description}</i>
          <div>required skills {course.requirements.join(", ")}</div>
        </div>
      );
    default:
      return null;
  }
};

export default Part;
