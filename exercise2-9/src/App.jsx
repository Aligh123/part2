import { useState } from "react";

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

  const handleAddPerson = (e) => {
    e.preventDefault();

    const nameExist = persons.some(person => person.name === newName);
    const numberExist = persons.some(person => person.number === newPhoneNumber);

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

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with: 
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search name"
        />
      </div>

      <form onSubmit={handleAddPerson}>
        <div>
          Name:
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Add full name"
          />
        </div>
        <div>
          Number:
          <input
            type="text"
            value={newPhoneNumber}
            onChange={(e) => setNewPhoneNumber(e.target.value)}
            placeholder="Phone number"
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>

      <h3>Numbers</h3>
      <ul>
        {personsToShow.map((person, index) => (
          <li key={index}>
            {person.name}: {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
