import fs from 'fs';
import path from 'path';
import process from 'process';
import parse from './parsers.js';
import format from './formatters/index.js';
import getComparisonData from './getComparisonData.js';

const genDiff = (path1, path2, formatter = 'stylish') => {
  const normaliseFilePath = (filePath) => path.resolve(process.cwd(), filePath);
  const getFile = (filePath) => fs.readFileSync(normaliseFilePath(filePath), 'utf-8');
  const getFileFormat = (file) => path.extname(file).toLowerCase();
  const file1Data = parse(getFile(path1), getFileFormat(path1));
  const file2Data = parse(getFile(path2), getFileFormat(path2));

  return format(getComparisonData(file1Data, file2Data), formatter);
};

export default genDiff;
