import _ from 'lodash';

const convertToString = (data, givenDepth) => {
  if (_.isObject(data)) {
    const iter = (object, depth) => {
      const entries = Object.entries(object);
      return entries.map(([key, value]) => {
        if (_.isObject(value)) {
          return `${'    '.repeat(depth)}${key}: {\n${iter(value, depth + 1)}\n${'    '.repeat(depth)}}`;
        }
        return `${'    '.repeat(depth)}${key}: ${value}`;
      });
    };
    return `{\n${iter(data, givenDepth + 1).join('\n')}\n${'    '.repeat(givenDepth)}}`;
  }
  return data;
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    const result = node.flatMap((item) => {
      switch (item.status) {
        case 'added':
          return `${' '.repeat(depth * 4 - 2)}+ ${item.key}: ${convertToString(item.value, depth)}`;
        case 'deleted':
          return `${' '.repeat(depth * 4 - 2)}- ${item.key}: ${convertToString(item.value, depth)}`;
        case 'unchanged':
          return `${'    '.repeat(depth)}${item.key}: ${convertToString(item.value, depth)}`;
        case 'node':
          return `${'    '.repeat(depth)}${item.key}: {\n${iter(item.children, depth + 1)}\n${'    '.repeat(depth)}}`;
        default:
          throw new Error('Unknown value status');
      }
    });
    return result.join('\n');
  };
  return `{\n${iter(tree, 1)}\n}`;
};

export default stylish;
