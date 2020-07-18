import React, { Component } from 'react';
import NotesContainer from '../NotesContainer';
import staticNotes from '../../utils/staticNotes';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.setState({
      notes: staticNotes,
      isLoaded: true,
    });
  }

  render() {
    const { notes, isLoaded } = this.state;
    if (!isLoaded) {
      return <p>There will be preloader</p>;
    }
    return (
      <NotesContainer notes={notes} />
    );
  }
}

export default App;
