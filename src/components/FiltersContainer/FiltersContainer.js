import React from 'react';
import { Input, FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';

const FiltersContainer = ({ filters, onSetFilter, value }) => {
  const options = ['none', ...filters];
  return (
    <FormGroup>
      <Label for="exampleSelect">Select</Label>
      <Input type="select" name="select" id="exampleSelect" onChange={onSetFilter} value={value}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </Input>
    </FormGroup>
  );
};

FiltersContainer.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSetFilter: PropTypes.func.isRequired,
};

export default FiltersContainer;
