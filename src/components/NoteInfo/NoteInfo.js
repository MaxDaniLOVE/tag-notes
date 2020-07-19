import React from 'react';
import PropTypes from 'prop-types';
import Highlighter from 'react-highlight-words';
import { hashTagRegExp } from '../../utils/constants';

const NoteInfo = ({ children }) => (
  <div className="note-info">
    <h4>
      <Highlighter
        className="list-group-item__title"
        highlightClassName="list-group-item__highlighted"
        searchWords={children.match(hashTagRegExp) || []}
        autoEscape
        textToHighlight={children}
      />
    </h4>
  </div>
);

NoteInfo.propTypes = {
  children: PropTypes.string.isRequired,
};

export default NoteInfo;
