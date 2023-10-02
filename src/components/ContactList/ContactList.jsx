import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { Contact } from 'components/Contact/Contact';
import css from './ContactList.module.css';

const getVisibleContacts = (contacts, filter) => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );
};

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const visibleContacts = getVisibleContacts(contacts, filter);

  return (
    <ul className={css.contactList}>
      {visibleContacts.map(contact => (
        <li key={contact.id} className={css.contactList__item}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
};

getVisibleContacts.propTypes = {
  contacts: PropTypes.shape({
    name: PropTypes.string,
  }),
  filter: PropTypes.string,
};
