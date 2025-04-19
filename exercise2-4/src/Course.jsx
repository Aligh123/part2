import React from "react";
const Header = ({ name }) => <h1>{name}</h1>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>
      <strong>Total exercises are {total}</strong>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      {course.map((courseItem) => (
        <div key={courseItem.id}>
          <Header name={courseItem.name} />
          <Content parts={courseItem.parts} />
          <Total parts={courseItem.parts} />
        </div>
      ))}
    </div>
  );
};
export default Course;
