import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NotesContainer from '../NotesContainer';
import getHashtags from '../../utils/getHashtags';
import getRandomId from '../../utils/getRandomId';
import FiltersContainer from '../FiltersContainer';
import APIService from '../../services/APIService';
import Preloader from '../Preloader';
import filterNotesByTag from '../../utils/filterNotesByTag';
import updateFilterData from '../../utils/updateFilterData';

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

  onResetNewNote = () => this.setState({ newNote: '' });

  onAddNewNote = async () => {
    const { newNote: note, notes: previousNotes } = this.state;

    const newNote = {
      id: getRandomId(),
      note,
    };

    const notes = [...previousNotes, newNote];
    await APIService.saveData(notes);

    this.setState(({ activeFilter }) => {
      const filters = getHashtags(notes);

      const { filteredNotes } = updateFilterData(notes, activeFilter);

      return {
        notes, filters, filteredNotes,
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

  onEditSubmit = async (recievedId, note, activeFilter) => {
    const { notes } = this.state;

    const index = notes.findIndex(({ id }) => id === recievedId);

    const updatedNotes = [
      ...notes.slice(0, index),
      { note, id: getRandomId() },
      ...notes.slice(index + 1),
    ];
    await APIService.saveData(updatedNotes);

    const filters = getHashtags(updatedNotes);

    const { filteredNotes, newFilter } = updateFilterData(updatedNotes, activeFilter, filters);

    this.setState({
      notes: updatedNotes, filters, filteredNotes, activeFilter: newFilter,
    });
  }

  onDeleteNote = async (recievedId) => {
    const { notes } = this.state;

    const index = notes.findIndex(({ id }) => id === recievedId);

    const updatedNotes = [
      ...notes.slice(0, index),
      ...notes.slice(index + 1),
    ];
    await APIService.saveData(updatedNotes);

    this.setState(({ activeFilter }) => {
      const filters = getHashtags(updatedNotes);

      const { filteredNotes, newFilter } = updateFilterData(updatedNotes, activeFilter, filters);

      return {
        notes: updatedNotes, filters, filteredNotes, activeFilter: newFilter,
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
          onResetNewNote={this.onResetNewNote}
        />
      </Container>
    );
  }
}

export default App;
