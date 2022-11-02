interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: Array<CoursePart>;
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <>
      {courseParts.map((course) => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;
