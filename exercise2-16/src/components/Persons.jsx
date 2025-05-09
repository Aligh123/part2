const Persons = ({ persons, handleDelete }) => (
    <ul>
      {persons.map(p => (
        <li key={p.id}>
          {p.name} {p.number}
          <button onClick={() => handleDelete(p.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
  
  export default Persons;
  