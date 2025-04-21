import { useState, useEffect } from 'react';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    personService.getAll().then(data => setPersons(data));
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const existing = persons.find(p => p.name === newName);
    const newPerson = { name: newName, number: newNumber };

    if (existing) {
      alert(`${newName} is already in the phonebook.`);
      return;
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      });
  };

  const deletePerson = (id, name) => {
    const confirm = window.confirm(`Delete ${name}?`);
    if (!confirm) return;

    personService.remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id));
      })
      .catch(() => {
        alert(`Person ${name} was already removed from server`);
        setPersons(persons.filter(p => p.id !== id)); // برای اینکه UI هم آپدیت شه
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map(person =>
        <p key={person.id}>
          {person.name} {person.number}{' '}
          <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
        </p>
      )}
    </div>
  );
};

export default App;
