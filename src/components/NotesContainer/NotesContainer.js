import React from 'react';
import { ListGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import NoteItem from '../NoteItem';

import './notesContainer.scss';

const NotesContainer = ({ notes }) => {
  const noteItems = notes.map(({ id, note }) => <NoteItem key={id}>{note}</NoteItem>);
  return (
    <ListGroup id="notes-container">{noteItems}</ListGroup>
  );
};

NotesContainer.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default NotesContainer;
