const _ = require('lodash');

const json1 = {
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}

const json2 = {
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}

const compare = (object1, object2) => {
  const object1keys = Object.keys(object1);
  const object2keys = Object.keys(object2);
  const uniqueKeys = _.union(object1keys, object2keys);

  const statusCollection = uniqueKeys.reduce((result, key) => {
    if (!_.has(object1, key)) {
      result.push({ key, 'value': object2[key], 'status': '+' });
    }
    if (!_.has(object2, key)) {
      result.push({ key, 'value': object1[key], 'status': '-' });
    }
    if (_.has(object1, key) && _.has(object2, key)) {
      if (object1[key] !== object2[key]) {
        result.push({ key, 'value': object1[key], 'status': '-' });
        result.push({ key, 'value': object2[key], 'status': '+' });
      }
      if (object1[key] === object2[key]) {
        result.push({ key, 'value': object1[key], 'status': ' ' });
      }
    }
    return result;
  }, []);
  const sortedStatusCollection = _.sortBy(statusCollection, [function(o) { return o.key; }]);
  const result = sortedStatusCollection.reduce((res, item) => {
    res.push(`${item.status} ${item.key}: ${item.value}`);
    return res;
  }, [])
  return `{\n${result.join('\n')}\n}`;
}

console.log(compare(json1, json2));