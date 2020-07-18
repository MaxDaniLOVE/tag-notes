import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NotesContainer from '../NotesContainer';
import { staticNotes } from '../../utils/constants';
import getRandomId from '../../utils/getRandomId';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      isLoaded: false,
      newNote: ''
    };
  }

  componentDidMount() {
    this.setState({
      notes: staticNotes,
      isLoaded: true,
    });
  }

  onInputChange = ({ target: { value } }) => {
    this.setState({
      newNote: value,
    })
  };

  onAddNewNote = () => {
    const { newNote: note } = this.state;
    const newNote = { 
      id: getRandomId(),
      note,
    }
    this.setState(({ notes }) => ({ notes: [...notes, newNote], newNote: '' }));
  }

  render() {
    const { notes, isLoaded, newNote } = this.state;
    if (!isLoaded) {
      return <p>There will be preloader</p>;
    }
    return (
      <Container>
        <NotesContainer
        notes={notes}
        onInputChange={this.onInputChange}
        newNote={newNote}
        onAddNewNote={this.onAddNewNote}/>
      </Container>
    );
  }
}

export default App;
