import React, { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    personService.getAll().then((numbers) => setPersons(numbers));
  }, []);

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
    const personWithSameName = persons.find(({ name }) => name === newName);
    if (personWithSameName) {
      const replacePersonsNumber = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (replacePersonsNumber) {
        const personObject = { ...personWithSameName, number: newNumber };
        personService
          .updateNumber(personObject.id, personObject)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );
          });
      }
    } else {
      const personObject = { name: newName, number: newNumber };
      personService.create(personObject).then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      `Delete ${persons.find((person) => person.id === id).name} ?`
    );
    if (confirmed) {
      personService.deleteNumber(id).then((statusCode) => {
        if (statusCode === 200) {
          setPersons(persons.filter((person) => person.id !== id));
        } else {
          window.alert("Deletion not successful: ", statusCode);
        }
      });
    }
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
      <Persons persons={shownPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
