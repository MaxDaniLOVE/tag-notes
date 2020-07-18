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
      <Container>
        <NotesContainer notes={notes} />
      </Container>
    );
  }
}

export default App;
