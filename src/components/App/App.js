import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NotesContainer from '../NotesContainer';
import { staticNotes, hashTagRegExp } from '../../utils/constants';
import getRandomId from '../../utils/getRandomId';
import FiltersContainer from '../FiltersContainer';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      isLoaded: false,
      newNote: '',
      filters: [],
      filteredNotes: [],
      activeFilter: '',
    };
  }

  componentDidMount() {
    const filters = this.getHashtags(staticNotes);
    this.setState({
      notes: staticNotes,
      isLoaded: true,
      filters,
    });
  }

  getHashtags = (notes) => {
    const filters = new Set();
    const tagsArray = notes.map(({ note }) => note.match(hashTagRegExp))
      .flat()
      .filter((tag) => tag);
    tagsArray.map((tag) => filters.add(tag));
    return [...filters];
  }

  onInputChange = ({ target: { value } }) => {
    this.setState({
      newNote: value,
    });
  };

  onAddNewNote = () => {
    const { newNote: note } = this.state;

    const newNote = {
      id: getRandomId(),
      note,
    };

    this.setState(({ notes: previousNotes }) => {
      const notes = [...previousNotes, newNote];
      const filters = this.getHashtags(notes);
      return { notes, newNote: '', filters };
    });
  }

  onSetFilter = ({ target: { value } }) => {
    const { notes } = this.state;

    if (value === 'none') {
      this.setState({ filteredNotes: [], activeFilter: '' });
    } else {
      const filteredNotes = notes.filter(({ note }) => note.includes(value));
      this.setState({ activeFilter: value, filteredNotes });
    }
  }

  onEditSubmit = (recievedId, note) => {
    this.setState(({ notes }) => {
      const index = notes.findIndex(({ id }) => id === recievedId);

      const updatedNotes = [
        ...notes.slice(0, index),
        { note, id: getRandomId() },
        ...notes.slice(index + 1),
      ];

      const filters = this.getHashtags(updatedNotes);

      return { notes: updatedNotes, filters };
    });
  }

  render() {
    const {
      notes, isLoaded, newNote, filters, filteredNotes, activeFilter,
    } = this.state;

    const notesToDisplay = !filteredNotes.length ? notes : filteredNotes;

    if (!isLoaded) {
      return <p>There will be preloader</p>;
    }
    return (
      <Container>
        <FiltersContainer filters={filters} onSetFilter={this.onSetFilter} value={activeFilter} />
        <NotesContainer
          notes={notesToDisplay}
          onInputChange={this.onInputChange}
          newNote={newNote}
          onAddNewNote={this.onAddNewNote}
          onEditSubmit={this.onEditSubmit}
        />
      </Container>
    );
  }
}

export default App;
