import { hashTagRegExp } from './constants';

const getHashtags = (notes) => {
  const filters = new Set();

  const tagsArray = notes.map(({ note }) => note.match(hashTagRegExp))
    .flat()
    .filter((tag) => tag);

  tagsArray.map((tag) => filters.add(tag));

  return [...filters];
};

export default getHashtags;
