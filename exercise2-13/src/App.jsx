import { useState, useEffect } from 'react';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const handleAddPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(p => p.name === newName);
    if (existingPerson) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber
    };

    personService.create(newPerson).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={handleAddPerson}>
        <div>
          name: <input value={newName} onChange={e => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map(person =>
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      )}
    </div>
  );
};

export default App;
