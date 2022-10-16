import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList';

import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContact] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [veluesOfInput, setValuesOfInput] = useState({
    name: '',
    number: '',
    filter: '',
  });

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const checkNameContacts = (enteredName, contacts) => {
    return contacts.find(
      contact => contact.name.toLowerCase() === enteredName.toLowerCase()
    );
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setValuesOfInput(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = data => {
    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };
    if (!checkNameContacts(newContact.name, contacts)) {
      setContact(prevState => [...prevState, newContact]);
      return true;
    } else {
      alert(`${newContact.name} is already in contact`);
      return false;
    }
  };

  const filterContacts = () => {
    // const { contacts, filter } = this.state;
    const normilizeFilter = veluesOfInput.filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizeFilter)
    );
  };

  const deleteContacts = id => {
    setContact(prevState => prevState.filter(contact => contact.id !== id));
  };

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        veluesOfInput={veluesOfInput}
      />

      <h2>Contacts</h2>
      {contacts.length === 0 ? (
        <p>No contacts added</p>
      ) : (
        <>
          <Filter
            title="Find contacts by name"
            onChange={handleChange}
            contacts={filterContacts}
          />
          <ContactList
            visibleLIst={
              veluesOfInput.filter !== '' ? filterContacts() : contacts
            }
            deleteIt={deleteContacts}
          />
        </>
      )}
    </div>
  );
};
