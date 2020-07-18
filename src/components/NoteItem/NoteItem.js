import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'reactstrap';
import NotesButtons from '../NotesButtons';
import Modal from '../Modal';
import NoteInfo from '../NoteInfo';
import useModalToggle from '../../hooks/useModalToggle';

import './noteItem.scss';

const NoteItem = ({ children }) => {
  const [isModalOpen, onOpenModal, onCloseModal] = useModalToggle(false);

  const content = children;
  return (
    <>
      <ListGroupItem>
        {content}
        <NotesButtons onShow={onOpenModal} onEdit={() => {}} onDelete={() => {}} />
      </ListGroupItem>
      <Modal isModalOpen={isModalOpen} onCloseModal={onCloseModal}>
        <NoteInfo>
          {content}
        </NoteInfo>
      </Modal>
    </>
  );
};

NoteItem.propTypes = {
  children: PropTypes.string.isRequired,
};

export default NoteItem;
