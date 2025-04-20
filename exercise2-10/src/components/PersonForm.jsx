// components/PersonForm.jsx
const PersonForm = ({
    newName,
    newPhoneNumber,
    handleNameChange,
    handlePhoneChange,
    handleAddPerson,
  }) => {
    return (
      <form onSubmit={handleAddPerson}>
        <div>
          Name:
          <input
            type="text"
            value={newName}
            onChange={handleNameChange}
            placeholder="Add full name"
          />
        </div>
        <div>
          Number:
          <input
            type="text"
            value={newPhoneNumber}
            onChange={handlePhoneChange}
            placeholder="Phone number"
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    );
  };
  
  export default PersonForm;
  