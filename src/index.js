import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import process from 'process';
import parse from './parsers.js';

const genDiff = (path1, path2) => {
  const normaliseFilePath = (filePath) => path.resolve(process.cwd(), filePath);
  const getFile = (filePath) => fs.readFileSync(normaliseFilePath(filePath), 'utf-8');
  const getFileFormat = (file) => path.extname(file).toLowerCase();

  const object1 = parse(getFile(path1), getFileFormat(path1));
  const object2 = parse(getFile(path2), getFileFormat(path2));
  const object1keys = Object.keys(object1);
  const object2keys = Object.keys(object2);
  const uniqueKeys = _.union(object1keys, object2keys);

  const statusCollection = uniqueKeys.reduce((result, key) => {
    if (!_.has(object1, key)) {
      result.push({ key, value: object2[key], status: '  +' });
    }
    if (!_.has(object2, key)) {
      result.push({ key, value: object1[key], status: '  -' });
    }
    if (_.has(object1, key) && _.has(object2, key)) {
      if (object1[key] !== object2[key]) {
        result.push({ key, value: object1[key], status: '  -' });
        result.push({ key, value: object2[key], status: '  +' });
      }
      if (object1[key] === object2[key]) {
        result.push({ key, value: object1[key], status: '   ' });
      }
    }
    return result;
  }, []);
  const sortedStatusCollection = _.sortBy(statusCollection, [(o) => o.key]);
  const result = sortedStatusCollection.reduce((res, item) => {
    res.push(`${item.status} ${item.key}: ${item.value}`);
    return res;
  }, []);
  const formattedResult = `{\n${result.join('\n')}\n}`;
  return formattedResult;
};

export default genDiff;
