import _ from 'lodash';

const valueToString = (val) => {
  if (typeof val === 'string') {
    return `'${val}'`;
  }
  if (_.isObject(val)) {
    return '[complex value]';
  }
  return val;
};

const plain = (tree) => {
  const iter = (node, parent) => {
    const result = node.filter(((item) => item.type !== 'unchanged')).flatMap((item) => {
      switch (item.type) {
        case 'added':
          return `Property '${parent}${item.key}' was added with value: ${valueToString(item.value)}`;
        case 'deleted':
          return `Property '${parent}${item.key}' was removed`;
        case 'updated':
          return `Property '${parent}${item.key}' was updated. From ${valueToString(item.oldValue)} to ${valueToString(item.newValue)}`;
        case 'node':
          return `${iter(item.children, `${parent}${item.key}.`)}`;
        default:
          throw new Error('Unknown value type');
      }
    });
    return result.join('\n');
  };
  return iter(tree, '');
};

export default plain;
