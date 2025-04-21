import { useState, useEffect } from 'react';
import personService from './services/persons';
import PersonForm from './components/PersonForm.jsx';
import Persons from './components/Persons.jsx';
import Filter from './components/Filter.jsx';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService.getAll().then(data => setPersons(data));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const existing = persons.find(p => p.name === newName);
    const newPerson = { name: newName, number: newNumber };

    if (existing) {
      alert(`${newName} is already in the phonebook.`);
      return;
    }

    personService.create(newPerson).then(returned => {
      setPersons(persons.concat(returned));
      setNewName('');
      setNewNumber('');
    });
  };

  const personsToShow = filter
    ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={e => setFilter(e.target.value)} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        name={newName}
        number={newNumber}
        handleNameChange={e => setNewName(e.target.value)}
        handleNumberChange={e => setNewNumber(e.target.value)}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
