import React from 'react';
import { ListGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import NoteItem from '../NoteItem';
import { AddNoteButton } from '../Buttons';

import './notesContainer.scss';

const NotesContainer = ({ notes }) => {
  const noteItems = notes.map(({ id, note }) => <NoteItem key={id}>{note}</NoteItem>);
  return (
    <>
      <ListGroup>{noteItems}</ListGroup>
      <AddNoteButton onClick={() => {}} />
    </>
  );
};

NotesContainer.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default NotesContainer;
