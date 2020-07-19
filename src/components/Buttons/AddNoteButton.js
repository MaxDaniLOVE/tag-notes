import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { AddIcon } from '../../icons';

const AddNoteButton = ({ onClick }) => (
  <Button className="add-note-btn" onClick={onClick}><AddIcon /></Button>
);

AddNoteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddNoteButton;
