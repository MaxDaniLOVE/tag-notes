import React from 'react';
import { ListGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import NoteItem from '../NoteItem';
import { AddNoteButton, SuccessButton } from '../Buttons';
import Modal from '../Modal';
import useModalToggle from '../../hooks/useModalToggle';
import HighlightedInput from '../HighlightedInput';

import './notesContainer.scss';

const NotesContainer = ({
  notes, newNote, onInputChange, onAddNewNote, onEditSubmit, onDeleteNote, onResetNewNote,
}) => {
  const [isModalOpen, onOpenModal, onCloseModal] = useModalToggle();

  const closeModalHandler = () => {
    onResetNewNote();
    onCloseModal();
  };

  const onAddNote = () => {
    onAddNewNote();
    closeModalHandler();
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
      <Modal isModalOpen={isModalOpen} onCloseModal={closeModalHandler} title="Add note:">
        <>
          <HighlightedInput onChange={onInputChange} inputValue={newNote} />
          <SuccessButton onClick={onAddNote}>+</SuccessButton>
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
  onResetNewNote: PropTypes.func.isRequired,
};

export default NotesContainer;
