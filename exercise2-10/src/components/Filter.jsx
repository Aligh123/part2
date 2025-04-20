// components/Filter.jsx
const Filter = ({ filter, handleFilterChange }) => {
    return (
      <div>
        Filter shown with:
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Search name"
        />
      </div>
    );
  };
  
  export default Filter;
  