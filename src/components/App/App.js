import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NotesContainer from '../NotesContainer';
import staticNotes from '../../utils/staticNotes';
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

  render() {
    const { notes, isLoaded, newNote } = this.state;
    if (!isLoaded) {
      return <p>There will be preloader</p>;
    }
    return (
      <Container>
        <NotesContainer notes={notes} onInputChange={this.onInputChange} newNote={newNote} />
      </Container>
    );
  }
}

export default App;
