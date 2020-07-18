import React from 'react';
import { ListGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import NoteItem from '../NoteItem';
import { AddNoteButton } from '../Buttons';
import Modal from '../Modal';
import useModalToggle from '../../hooks/useModalToggle';
import HighlightedInput from '../HighlightedInput';

import './notesContainer.scss';

const NotesContainer = ({
  notes, newNote, onInputChange, onAddNewNote, onEditSubmit, onDeleteNote,
}) => {
  const [isModalOpen, onOpenModal, onCloseModal] = useModalToggle(false);

  const onAddNote = () => {
    onAddNewNote();
    onCloseModal();
  };

  const noteItems = notes.map(({ id, note }) => (
    <NoteItem
      key={id}
      id={id}
      onEditSubmit={onEditSubmit}
      onDeleteNote={onDeleteNote}
    >
      {note}
    </NoteItem>
  ));

  return (
    <>
      <ListGroup>{noteItems}</ListGroup>
      <AddNoteButton onClick={onOpenModal} />
      <Modal isModalOpen={isModalOpen} onCloseModal={onCloseModal}>
        <>
          <HighlightedInput onChange={onInputChange} inputValue={newNote} />
          <Button onClick={onAddNote}>+</Button>
        </>
      </Modal>
    </>
  );
};

NotesContainer.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  newNote: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onAddNewNote: PropTypes.func.isRequired,
  onEditSubmit: PropTypes.func.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
};

export default NotesContainer;
