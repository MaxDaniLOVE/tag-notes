import React from 'react';
import PropTypes from 'prop-types';

const NoteInfo = ({ children }) => (
  <div className="note-info">
    <h3>Note:</h3>
    <h4>{children}</h4>
  </div>
);

NoteInfo.propTypes = {
  children: PropTypes.string.isRequired,
};

export default NoteInfo;
