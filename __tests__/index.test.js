import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('comparing json vs json', () => {
  const testDiff = genDiff(getFixturePath('testFile1.json'), getFixturePath('testFile2.json'));
  expect(testDiff).toMatch(readFile('testResult.txt'));
});

test('comparing json vs yaml', () => {
  const testDiff = genDiff(getFixturePath('testFile1.json'), getFixturePath('testFile2.yaml'));
  expect(testDiff).toMatch(readFile('testResult.txt'));
});

test('comparing yaml vs yaml', () => {
  const testDiff = genDiff(getFixturePath('testFile1.yaml'), getFixturePath('testFile2.yaml'));
  expect(testDiff).toMatch(readFile('testResult.txt'));
});
