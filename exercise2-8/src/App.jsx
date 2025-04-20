import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "120322-2" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, SetNewPhoneNumber] = useState("");

  const handleAddPerson = (e) => {
    e.preventDefault();

    const nameExist = persons.some((person) => person.name === newName);
    const numberExist = persons.some(
      (person) => person.number === newPhoneNumber
    );

    if (nameExist) {
      alert("this name has already been added");
      return;
    }
    if (numberExist) {
      alert("this number has already been added!");
      return;
    }
    const newPerson = {
      name: newName,
      number: newPhoneNumber,
    };
    setPersons([...persons, newPerson]);
    setNewName("");
    SetNewPhoneNumber("");
  };

  return (
    <div>
      <h2>PhoneBook</h2>

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
          Number:{" "}
          <input
            type="text"
            value={newPhoneNumber}
            onChange={(e) => SetNewPhoneNumber(e.target.value)}
            placeholder="Phone Number"
          />
        </div>
        <div>
          <button type="submit">ADD</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>
            {person.name}: {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default App;
