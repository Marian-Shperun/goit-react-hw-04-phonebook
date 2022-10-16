import React, { Component } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList';

import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  // фаза монтування
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
    console.log(parsedContacts);
  }

  // фаза оновлення
  componentDidUpdate(prevProps, prevState) {
    // щоб незациклити компонент визивати тільки при умові.
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      console.log('обновилось');
    }
  }

  // --------
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    console.log(number.length);
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
   

    if (!this.checkNameContacts(newContact.name, this.state.contacts)) {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
      e.target.reset();
    } else {
      alert(`${newContact.name} is already in contact`);
    }
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    const normilizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizeFilter)
    );
  };

  checkNameContacts = (enteredName, contacts) => {
    return contacts.find(
      contact => contact.name.toLowerCase() === enteredName.toLowerCase()
    );
  };

  deleteContacts = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        />

        <h2>Contacts</h2>
        {contacts.length === 0 ? (
          <p>No contacts added</p>
        ) : (
          <>
            <Filter
              title="Find contacts by name"
              onChange={this.handleChange}
              contacts={this.filterContacts}
            />
            <ContactList
              visibleLIst={filter !== '' ? this.filterContacts() : contacts}
              deleteIt={this.deleteContacts}
            />
          </>
        )}
      </div>
    );
  }
}
