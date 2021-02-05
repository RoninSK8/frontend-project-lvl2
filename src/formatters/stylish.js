// import _ from 'lodash';

const stylish = (tree) => {
  const iter = (node, depth) => {
    const result = node.flatMap((item) => {
      switch (item.status) {
        case 'added':
          return `${'  '.repeat(depth + 1)}+ ${item.key}: ${item.value}`;
        case 'deleted':
          return `${'  '.repeat(depth + 1)}- ${item.key}: ${item.value}`;
        case 'unchanged':
          return `${'  '.repeat(depth + 1)}  ${item.key}: ${item.value}`;
        case 'node':
          return `${'  '.repeat(depth + 1)}  ${item.key}: {\n${iter(item.children, depth + 2)}\n  ${'  '.repeat(depth + 1)}}`;
        default:
          throw new Error('Unknown value status');
      }
    });
    return result.join('\n');
  };
  return `{\n${iter(tree, 0)}\n}`;
};

export default stylish;
