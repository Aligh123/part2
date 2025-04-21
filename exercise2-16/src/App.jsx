import { useEffect, useState } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import './index.css'
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('success');

  useEffect(() => {
    personService.getAll().then(data => setPersons(data));
  }, []);

  const showMessage = (text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 4000);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const existing = persons.find(p => p.name === newName);

    if (existing) {
      const confirmed = window.confirm(`${newName} is already added. Replace the number?`);
      if (confirmed) {
        const updatedPerson = { ...existing, number: newNumber };
        personService
          .update(existing.id, updatedPerson)
          .then(updated => {
            setPersons(persons.map(p => p.id !== updated.id ? p : updated));
            showMessage(`Updated ${updated.name}`);
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      personService
        .create(newPerson)
        .then(added => {
          setPersons(persons.concat(added));
          showMessage(`Added ${added.name}`);
        });
    }

    setNewName('');
    setNewNumber('');
  };

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id);
    if (!window.confirm(`Delete ${person.name}?`)) return;

    personService.remove(id).then(() => {
      setPersons(persons.filter(p => p.id !== id));
      showMessage(`Deleted ${person.name}`);
    });
  };

  const filtered = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter filter={filter} handleChange={e => setFilter(e.target.value)} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={e => setNewName(e.target.value)}
        handleNumberChange={e => setNewNumber(e.target.value)}
      />
      <h3>Numbers</h3>
      <Persons persons={filtered} handleDelete={deletePerson} />
    </div>
  );
};

export default App;
