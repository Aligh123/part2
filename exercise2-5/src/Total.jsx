const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>
      <strong>The total exercises are {total}</strong>
    </p>
  );
};

export default Total;
