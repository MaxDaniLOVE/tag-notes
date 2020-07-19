import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import { DeleteIcon, ShowNoteIcon, EditIcon } from '../../icons';

const NotesButtons = ({ onShow, onEdit, onDelete }) => (
  <ButtonGroup>
    <Button onClick={onShow} color="info"><ShowNoteIcon /></Button>
    <Button onClick={onEdit} color="warning"><EditIcon /></Button>
    <Button onClick={onDelete} color="danger"><DeleteIcon /></Button>
  </ButtonGroup>
);

NotesButtons.propTypes = {
  onShow: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NotesButtons;
