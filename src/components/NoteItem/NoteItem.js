import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem, Input, Button } from 'reactstrap';
import Highlighter from 'react-highlight-words';
import NotesButtons from '../NotesButtons';
import Modal from '../Modal';
import NoteInfo from '../NoteInfo';
import useModalToggle from '../../hooks/useModalToggle';
import { hashTagRegExp } from '../../utils/constants';

import './noteItem.scss';

const NoteItem = ({ children, id, onEditSubmit }) => {
  const [isModalOpen, onOpenModal, onCloseModal] = useModalToggle(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(children);

  const showEditInput = () => setIsEditMode(true);
  const hideEditInput = () => {
    setIsEditMode(false);
    setInputValue(children);
  };

  const onChange = ({ target: { value } }) => setInputValue(value);

  const onSaveChanges = () => {
    onEditSubmit(id, inputValue);
    hideEditInput();
  };

  const content = isEditMode
    ? (
      <>
        <Input value={inputValue} onChange={onChange} />
        <Button color="danger" onClick={hideEditInput}>X</Button>
        <Button color="success" onClick={onSaveChanges}>Save</Button>
      </>
    )
    : (
      <>
        <Highlighter
          className="list-group-item__title"
          highlightClassName="list-group-item__highlighted"
          searchWords={children.match(hashTagRegExp) || []}
          autoEscape
          textToHighlight={children}
        />
        <NotesButtons onShow={onOpenModal} onEdit={showEditInput} onDelete={() => {}} />
      </>
    );

  return (
    <>
      <ListGroupItem>
        {content}
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
  id: PropTypes.string.isRequired,
  onEditSubmit: PropTypes.func.isRequired,
};

export default NoteItem;
