import * as _ from 'lodash';
import fs from 'fs';
import path from 'path';
import process from 'process';

const readFile = (filePath) => JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filePath), "utf-8"));

// console.log(readFile('/home/ronin/svalka/testFile2.json'))

const genDiff = (path1, path2) => {
  const object1 = readFile(path1);
  const object2 = readFile(path2);
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

export default genDiff;