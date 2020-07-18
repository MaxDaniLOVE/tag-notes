import React from 'react';
import { ListGroup, Input, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import NoteItem from '../NoteItem';
import { AddNoteButton } from '../Buttons';
import Modal from '../Modal';
import useModalToggle from '../../hooks/useModalToggle';

import './notesContainer.scss';

const NotesContainer = ({
  notes, newNote, onInputChange, onAddNewNote, onEditSubmit,
}) => {
  const [isModalOpen, onOpenModal, onCloseModal] = useModalToggle(false);

  const onAddNote = () => {
    onAddNewNote();
    onCloseModal();
  };

  const noteItems = notes.map(({ id, note }) => {
    return <NoteItem key={id} id={id} onEditSubmit={onEditSubmit}>{note}</NoteItem>;
  });

  return (
    <>
      <ListGroup>{noteItems}</ListGroup>
      <AddNoteButton onClick={onOpenModal} />
      <Modal isModalOpen={isModalOpen} onCloseModal={onCloseModal}>
        <>
          <Input onChange={onInputChange} value={newNote} />
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
};

export default NotesContainer;
