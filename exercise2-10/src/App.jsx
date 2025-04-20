// App.jsx
import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleNameChange = (e) => setNewName(e.target.value);
  const handlePhoneChange = (e) => setNewPhoneNumber(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);

  const handleAddPerson = (e) => {
    e.preventDefault();

    const nameExist = persons.some((p) => p.name === newName);
    const numberExist = persons.some((p) => p.number === newPhoneNumber);

    if (nameExist) {
      alert("Name already exists!");
      return;
    }
    if (numberExist) {
      alert("Number already exists!");
      return;
    }

    const newPerson = { name: newName, number: newPhoneNumber };
    setPersons([...persons, newPerson]);
    setNewName("");
    setNewPhoneNumber("");
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        handleAddPerson={handleAddPerson}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  );
}

export default App;
