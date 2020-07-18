import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'reactstrap';
import NotesButtons from '../NotesButtons';

import './noteItem.scss';

const NoteItem = ({ children }) => {
  const content = children;
  return (
    <ListGroupItem>
      {content}
      <NotesButtons onShow={() => {}} onEdit={() => {}} onDelete={() => {}} />
    </ListGroupItem>
  );
};

NoteItem.propTypes = {
  children: PropTypes.string.isRequired,
};

export default NoteItem;
