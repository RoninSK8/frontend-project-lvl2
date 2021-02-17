import _ from 'lodash';

const generateIdent = (depth, sign = ' ') => {
  switch (sign) {
    case '+':
      return `${' '.repeat(depth * 4 - 2)}+ `;
    case '-':
      return `${' '.repeat(depth * 4 - 2)}- `;
    case ' ':
      return `${'    '.repeat(depth)}`;
    default:
      throw new Error('Unknown sign');
  }
};

const convertToString = (data, givenDepth) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const iter = (object, depth) => {
    const entries = Object.entries(object);
    return entries.map(([key, value]) => {
      if (_.isObject(value)) {
        return `${generateIdent(depth)}${key}: {\n${iter(value, depth + 1)}\n${generateIdent(depth)}}`;
      }
      return `${generateIdent(depth)}${key}: ${value}`;
    });
  };
  return `{\n${iter(data, givenDepth + 1).join('\n')}\n${generateIdent(givenDepth)}}`;
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    const result = node.flatMap((item) => {
      switch (item.type) {
        case 'added':
          return `${generateIdent(depth, '+')}${item.key}: ${convertToString(item.value, depth)}`;
        case 'deleted':
          return `${generateIdent(depth, '-')}${item.key}: ${convertToString(item.value, depth)}`;
        case 'unchanged':
          return `${generateIdent(depth)}${item.key}: ${convertToString(item.value, depth)}`;
        case 'updated':
          return `${generateIdent(depth, '-')}${item.key}: ${convertToString(item.oldValue, depth)}\n${generateIdent(depth, '+')}${item.key}: ${convertToString(item.newValue, depth)}`;
        case 'node':
          return `${generateIdent(depth)}${item.key}: {\n${iter(item.children, depth + 1)}\n${generateIdent(depth)}}`;
        default:
          throw new Error('Unknown value type');
      }
    });
    return result.join('\n');
  };
  return `{\n${iter(tree, 1)}\n}`;
};

export default stylish;
