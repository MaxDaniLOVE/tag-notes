import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import Highlighter from 'react-highlight-words';
import { hashTagRegExp } from '../../utils/constants';

import './highlightedInput.scss';

const HighlightedInput = ({ inputValue, onChange }) => (
  <div className="input-wrapper">
    <Input value={inputValue} onChange={onChange} />
    <Highlighter
      className="list-group-item__title"
      highlightClassName="list-group-item__highlighted"
      searchWords={inputValue.match(hashTagRegExp) || []}
      autoEscape
      textToHighlight={inputValue}
    />
  </div>
);

HighlightedInput.propTypes = {
  inputValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default HighlightedInput;
