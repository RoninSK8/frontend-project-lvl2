import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import format from './formatters/index.js';
import getComparisonData from './getComparisonData.js';

const normaliseFilePath = (filePath) => path.resolve(process.cwd(), filePath);
const getData = (filePath) => fs.readFileSync(normaliseFilePath(filePath), 'utf-8');
const getFileFormat = (file) => path.extname(file).toLowerCase().slice(1);

const genDiff = (path1, path2, formatter = 'stylish') => {
  const data1 = parse(getData(path1), getFileFormat(path1));
  const data2 = parse(getData(path2), getFileFormat(path2));
  return format(getComparisonData(data1, data2), formatter);
};

export default genDiff;
