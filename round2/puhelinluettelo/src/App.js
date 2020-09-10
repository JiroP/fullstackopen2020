import React, { useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchString, setSearchString] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const personExists = persons.map(({ name }) => name).includes(newName);
    if (personExists) {
      return window.alert(`${newName} is already added to phonebook`);
    }
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };

  const shownPersons = persons.filter(({ name }) =>
    name.toLowerCase().includes(searchString.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchString={searchString}
        handleSearchChange={handleSearchChange}
      />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={shownPersons} />
    </div>
  );
};

export default App;
