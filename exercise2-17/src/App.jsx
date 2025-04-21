import { useEffect, useState } from 'react';
import personService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('success');

  useEffect(() => {
    personService.getAll().then(setPersons);
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
      if (window.confirm(`${newName} is already added. Replace the number?`)) {
        const updatedPerson = { ...existing, number: newNumber };
        personService
          .update(existing.id, updatedPerson)
          .then(returned => {
            setPersons(persons.map(p => p.id !== returned.id ? p : returned));
            showMessage(`Updated ${returned.name}`);
          })
          .catch(error => {
            showMessage(`Error: '${existing.name}' has already been removed`, 'error');
            setPersons(persons.filter(p => p.id !== existing.id));
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

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id);
    if (!window.confirm(`Delete ${person.name}?`)) return;

    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id));
        showMessage(`Deleted ${person.name}`);
      })
      .catch(error => {
        showMessage(`Error: '${person.name}' was already removed`, 'error');
        setPersons(persons.filter(p => p.id !== id));
      });
  };

  const personsToShow = filter
    ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />

      <div>
        filter shown with <input value={filter} onChange={e => setFilter(e.target.value)} />
      </div>

      <h3>Add a new</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={e => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)} />
        </div>
        <button type="submit">add</button>
      </form>

      <h3>Numbers</h3>
      <ul>
        {personsToShow.map(p => (
          <li key={p.id}>
            {p.name} {p.number}
            <button onClick={() => handleDelete(p.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
