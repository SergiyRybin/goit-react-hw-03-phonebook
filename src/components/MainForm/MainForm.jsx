import { Component } from 'react';
import ContactForm from '../ContactForm/ContactForm ';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

class MainForm extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(prevP, prevState) {
    if (this.state.contacts !== prevState.contacts)
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) this.setState({ contacts: parseContacts });
  }

  fromStateData = data => {
    const { name, id, number } = data;
    this.setState(({ contacts }) => {
      if (contacts.find(el => el.name.toLowerCase() === name.toLowerCase())) {
        return alert(`${name} is already in contacts`);
      }
      return {
        contacts: [...contacts, { id, name, number }],
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
