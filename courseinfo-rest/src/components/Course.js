const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  let content = parts.map((element) => (
    <Part key={element.id} part={element} />
  ));
  return <>{content}</>;
};

const Course = ({ course }) => {
  const initialValue = 0;
  let sum = course.parts.reduce(
    (accumulator, element) => accumulator + element.exercises,
    initialValue
  );

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </>
  );
};

export default Course;
