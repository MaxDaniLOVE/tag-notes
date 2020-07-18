import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import PropTypes from 'prop-types';

const NotesButtons = ({ onShow, onEdit, onDelete }) => (
  <ButtonGroup>
    <Button onClick={onShow} color="info">show</Button>
    <Button onClick={onEdit} color="warning">edit</Button>
    <Button onClick={onDelete} color="danger">delete</Button>
  </ButtonGroup>
);

NotesButtons.propTypes = {
  onShow: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NotesButtons;
