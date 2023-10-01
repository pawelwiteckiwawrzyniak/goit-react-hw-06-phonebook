import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { ContactFilter } from './ContactFilter/ContactFilter';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const ls = localStorage.getItem('contacts');
    const lsParse = JSON.parse(ls);

    if (lsParse.length !== 0) {
      setContacts(lsParse);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    let name = form.elements.name.value;
    let number = form.elements.number.value;
    const id = nanoid();

    const listOfContacts = contacts.map(contact => contact.name);

    if (listOfContacts.find(contact => contact === name)) {
      return alert(name + ' is already in your contacts!');
    }
    setContacts([...contacts, { name, number, id }]);

    form.reset();
  };

  const handleFilter = event => {
    const filteredName = event.currentTarget.value;
    setFilter(filteredName.toLowerCase());
  };

  const handleDelete = event => {
    const id = event.currentTarget.id;
    const index = contacts.findIndex(contact => contact.id === id);
    const allContacts = contacts;
    allContacts.splice(index, 1);
    setContacts([...allContacts]);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm handleSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <ContactFilter handleFilter={handleFilter} />
      <ContactList
        contacts={contacts}
        filterPhrase={filter}
        handleDelete={handleDelete}
      />
    </div>
  );
};
