import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const AddNoteButton = ({ onClick }) => <Button className="add-note-btn" onClick={onClick}>+</Button>;

AddNoteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddNoteButton;
