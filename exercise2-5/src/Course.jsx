import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

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
