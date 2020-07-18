import getRandomId from './getRandomId';

const hashTagRegExp = /(?<=[\s>]|^)#(\w*[A-Za-z_]+\w*)/g;

const staticNotes = [
  {
    id: getRandomId(),
    note: 'Add new note',
  },
  {
    id: getRandomId(),
    note: 'Edit note',
  },
  {
    id: getRandomId(),
    note: 'Add new #hashtag',
  },
];

export { hashTagRegExp, staticNotes };
