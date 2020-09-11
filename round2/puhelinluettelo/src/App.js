import React, { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchString, setSearchString] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationColor, setNotificationColor] = useState("green");

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

  const cleanUpNotificationWithTimeOut = () => {
    setTimeout(() => setNotification(null), 3000);
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
            setNotification(
              `${updatedPerson.name} number updated to ${updatedPerson.number}`
            );
            setNotificationColor("green");
            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );
            cleanUpNotificationWithTimeOut();
          })
          .catch((error) => {
            handleError(newName, personWithSameName.id);
          });
      }
    } else {
      const personObject = { name: newName, number: newNumber };
      personService.create(personObject).then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
        setNewName("");
        setNewNumber("");
        setNotification(`${createdPerson.name} added`);
        setNotificationColor("green");
        cleanUpNotificationWithTimeOut();
      });
    }
  };

  const handleError = (name, id) => {
    setPersons(persons.filter((person) => person.id !== id));
    setNotification(
      `Information of ${name} has already been removed from server`
    );
    setNotificationColor("red");
    cleanUpNotificationWithTimeOut();
  };

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id);
    const confirmed = window.confirm(`Delete ${person.name} ?`);
    if (confirmed) {
      personService
        .deleteNumber(id)
        .then((statusCode) => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotification(`${person.name} was deleted`);
          setNotificationColor("green");
          cleanUpNotificationWithTimeOut();
        })
        .catch((error) => {
          handleError(person.name, person.id);
        });
    }
  };

  const shownPersons = persons.filter(({ name }) =>
    name.toLowerCase().includes(searchString.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} color={notificationColor} />
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
