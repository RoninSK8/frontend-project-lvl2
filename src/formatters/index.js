import stylish from './stylish.js';
import plain from './plain.js';

const format = (data, formatter) => {
  switch (formatter) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    default:
      throw new Error('Unknown output format');
  }
};

export default format;
