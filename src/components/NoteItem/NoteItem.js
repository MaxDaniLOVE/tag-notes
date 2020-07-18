import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'reactstrap';
import Highlighter from 'react-highlight-words';
import NotesButtons from '../NotesButtons';
import Modal from '../Modal';
import NoteInfo from '../NoteInfo';
import useModalToggle from '../../hooks/useModalToggle';
import { hashTagRegExp } from '../../utils/constants';

import './noteItem.scss';

const NoteItem = ({ children }) => {
  const [isModalOpen, onOpenModal, onCloseModal] = useModalToggle(false);

  return (
    <>
      <ListGroupItem>
        <Highlighter
          className="list-group-item__title"
          highlightClassName="list-group-item__highlighted"
          searchWords={children.match(hashTagRegExp) || []}
          autoEscape
          textToHighlight={children}
        />
        <NotesButtons onShow={onOpenModal} onEdit={() => {}} onDelete={() => {}} />
      </ListGroupItem>
      <Modal isModalOpen={isModalOpen} onCloseModal={onCloseModal}>
        <NoteInfo>
          {children}
        </NoteInfo>
      </Modal>
    </>
  );
};

NoteItem.propTypes = {
  children: PropTypes.string.isRequired,
};

export default NoteItem;
