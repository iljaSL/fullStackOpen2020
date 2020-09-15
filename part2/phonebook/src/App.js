import React, { useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [search, setSearch] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    console.log("Button Clicked");
    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => person.name === personObject.name) === true) {
      return window.alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
      setNewNumber("");
      setNewName("");
    }
  };

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };

  const personsToShow = showAll
    ? persons.filter((persons) =>
        persons.name.toLowerCase().includes(search.toLowerCase())
      )
    : persons;

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        search: <input value={search} onChange={handleSearch} />
      </div>
      <h2>Add a new person</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => (
          <Person key={person.name} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;
