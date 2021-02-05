import stylish from './stylish.js';

const format = (data, formatter) => {
  switch (formatter) {
    case 'stylish':
      return stylish(data);
    default:
      throw new Error('Unknown output format');
  }
};

export default format;
