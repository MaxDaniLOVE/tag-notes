import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'reactstrap';
import Highlighter from 'react-highlight-words';
import NotesButtons from '../NotesButtons';
import Modal from '../Modal';
import NoteInfo from '../NoteInfo';
import useModalToggle from '../../hooks/useModalToggle';
import { hashTagRegExp } from '../../utils/constants';
import HighlightedInput from '../HighlightedInput';
import { SuccessButton, DangerButton } from '../Buttons';
import { CloseIcon, SaveIcon } from '../../icons';

import './noteItem.scss';

const NoteItem = ({
  children, id, onEditSubmit, onDeleteNote,
}) => {
  const [isModalOpen, onOpenModal, onCloseModal] = useModalToggle();
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

  const onDelete = () => onDeleteNote(id);

  const content = isEditMode
    ? (
      <>
        <HighlightedInput inputValue={inputValue} onChange={onChange} />
        <DangerButton color="danger" onClick={hideEditInput}><CloseIcon /></DangerButton>
        <SuccessButton onClick={onSaveChanges}><SaveIcon /></SuccessButton>
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
        <NotesButtons onShow={onOpenModal} onEdit={showEditInput} onDelete={onDelete} />
      </>
    );

  return (
    <>
      <ListGroupItem>
        {content}
      </ListGroupItem>
      <Modal isModalOpen={isModalOpen} onCloseModal={onCloseModal} title="Note:">
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
  onDeleteNote: PropTypes.func.isRequired,
};

export default NoteItem;
