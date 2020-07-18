import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'reactstrap';

import './noteItem.scss';

const NoteItem = ({ children }) => {
  const content = children;
  return (
    <ListGroupItem>
      {content}
    </ListGroupItem>
  );
};

NoteItem.propTypes = {
  children: PropTypes.string.isRequired,
};

export default NoteItem;
