const Persons = ({ persons, filter }) => {
    const filteredPersons = persons.filter(p =>
      p.name.toLowerCase().includes(filter.toLowerCase())
    )
  
    return (
      <div>
        {filteredPersons.map(p => (
          <div key={p.id}>
            {p.name} {p.number}
          </div>
        ))}
      </div>
    )
  }
  
  export default Persons
  