import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NotesContainer from '../NotesContainer';
import getHashtags from '../../utils/getHashtags';
import getRandomId from '../../utils/getRandomId';
import FiltersContainer from '../FiltersContainer';
import APIService from '../../services/APIService';
import Preloader from '../Preloader';
import filterNotesByTag from '../../utils/filterNotesByTag';
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

  async componentDidMount() {
    const notes = await APIService.getData();

    const filters = getHashtags(notes);

    this.setState({
      notes,
      isLoaded: true,
      filters,
    });
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

    this.setState(({ notes: previousNotes, activeFilter }) => {
      const notes = [...previousNotes, newNote];
      const filters = getHashtags(notes);

      const filteredNotes = !activeFilter ? [] : filterNotesByTag(notes, activeFilter);

      return {
        notes, newNote: '', filters, filteredNotes,
      };
    });
  }

  onSetFilter = ({ target: { value } }) => {
    const { notes } = this.state;

    if (value === 'none') {
      this.setState({ filteredNotes: [], activeFilter: '' });
    } else {
      const filteredNotes = filterNotesByTag(notes, value);
      this.setState({ activeFilter: value, filteredNotes });
    }
  }

  onEditSubmit = (recievedId, note, activeFilter) => {
    this.setState(({ notes }) => {
      const index = notes.findIndex(({ id }) => id === recievedId);

      const updatedNotes = [
        ...notes.slice(0, index),
        { note, id: getRandomId() },
        ...notes.slice(index + 1),
      ];

      const filters = getHashtags(updatedNotes);

      const filteredNotes = !activeFilter ? [] : filterNotesByTag(updatedNotes, activeFilter);
      const updatedFilter = filters.includes(activeFilter) ? activeFilter : '';

      return {
        notes: updatedNotes, filters, filteredNotes, activeFilter: updatedFilter,
      };
    });
  }

  onDeleteNote = (recievedId) => {
    this.setState(({ notes, activeFilter }) => {
      const index = notes.findIndex(({ id }) => id === recievedId);

      const updatedNotes = [
        ...notes.slice(0, index),
        ...notes.slice(index + 1),
      ];

      const filters = getHashtags(updatedNotes);

      const filteredNotes = !activeFilter ? [] : filterNotesByTag(updatedNotes, activeFilter);
      const updatedFilter = filters.includes(activeFilter) ? activeFilter : '';

      return {
        notes: updatedNotes, filters, filteredNotes, activeFilter: updatedFilter,
      };
    });
  }

  render() {
    const {
      notes, isLoaded, newNote, filters, filteredNotes, activeFilter,
    } = this.state;

    const notesToDisplay = !filteredNotes.length ? notes : filteredNotes;

    if (!isLoaded) {
      return <Preloader />;
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
          onDeleteNote={this.onDeleteNote}
        />
      </Container>
    );
  }
}

export default App;
