import filterNotesByTag from './filterNotesByTag';

const updateFilterData = (notes, activeFilter, filters = []) => {
  const filteredNotes = !activeFilter ? [] : filterNotesByTag(notes, activeFilter);

  const newFilter = filters.includes(activeFilter) ? activeFilter : '';

  return { filteredNotes, newFilter };
};

export default updateFilterData;
