import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas" },
  ]);
  const [newName, setNewName] = useState("");

  const handleNewName = (e) => {
    e.preventDefault();

    if (newName) {
      setPersons([...persons, { name: newName }]);
      setNewName("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewName}>
        <div>
          name:
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>

      {/* Debug section (اختیاری) */}
      <div>debug: {newName}</div>

      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
