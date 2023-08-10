import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import phonebookServices from "./services/phonebook";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filterValue, setFilter] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    phonebookServices.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = persons.find((person) => person.name === newName);
    if (found === undefined) {
      const newContact = { name: newName, number: number };
      phonebookServices
        .create(newContact)
        .then((data) => setPersons(persons.concat(data)))
        .then(() => {
          setMessage(`Added ${newName}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        }).catch(error => {
          setMessage(error.response.data.error);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    } else {
      let askReplace = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (askReplace) {
        const updatedContact = { name: newName, number: number };
        const target = persons.filter((person) => person.name === newName);
        const id = target[0].id;
        phonebookServices
          .changeNumber(id, updatedContact)
          .then((data) =>
            setPersons(
              persons.map((person) => (person.id !== id ? person : data))
            )
          )
          .then(() => {
            setMessage(`Modified ${newName}`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch(() => {
            setMessage(`Information of ${newName} has already been removed`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
    }
    setNewName("");
    setNumber("");
    setFilter("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleFilter = (event) => {
    let value = event.target.value;
    setFilter(value);
    let regex = new RegExp(value, "i");
    let listResult = persons.filter(function (person) {
      return regex.test(person.name);
    });
    setFilteredList(listResult);
  };

  const handleDelete = (id, name) => {
    const proceed = window.confirm(`Delete ${name}?`);
    if (proceed) {
      phonebookServices
        .deleteContact(id)
        .then(setPersons(persons.filter((element) => element.id !== id)));
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Filter list={persons} handler={handleFilter} filterValue={filterValue} />
      <h2>New Contact</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        number={number}
        handleSubmit={handleSubmit}
      />
      <h2>Your Numbers</h2>
      <Persons
        list={persons}
        filtered={filteredList}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
