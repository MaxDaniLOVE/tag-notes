const filterNotesByTag = (notes, tag) => notes.filter(({ note }) => note.includes(tag));

export default filterNotesByTag;
