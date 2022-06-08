import { Component } from 'react';
import ContactForm from '../ContactForm/ContactForm ';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

class MainForm extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  fromStateData = data => {
    const { name, id, number } = data;
    this.setState(({ contacts }) => {
      if (contacts.find(el => el.name.toLowerCase() === name.toLowerCase())) {
        return alert(`${name} is already in contacts`);
      }
      return {
        contacts: [...contacts, { name, id, number }],
      };
    });
  };

  handleFilter = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  contactRemove = e => {
    const delValue = e.currentTarget.parentNode.firstChild.data;
    const { contacts } = this.state;
    this.setState({
      contacts: contacts.filter(el => el.name !== delValue),
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const filterBook = contacts.filter(({ name }) =>
      name.toLowerCase().startsWith(filter.toLowerCase())
    );
    return (
      <div className="phoneBook">
        <h1>Phonebook</h1>
        <ContactForm onSub={this.fromStateData} />

        <h1>Contacts</h1>
        <Filter onFilter={this.handleFilter} />
        <ContactList filterBook={filterBook} onRemove={this.contactRemove} />
      </div>
    );
  }
}

export default MainForm;
