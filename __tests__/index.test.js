import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('comparing json vs json', () => {
  const testDiff = genDiff(getFixturePath('before.json'), getFixturePath('after.json'));
  expect(testDiff).toMatch(readFile('stylishResult.txt'));
});

test('comparing json vs yaml', () => {
  const testDiff = genDiff(getFixturePath('before.json'), getFixturePath('after.yaml'));
  expect(testDiff).toMatch(readFile('stylishResult.txt'));
});

test('comparing yaml vs yaml', () => {
  const testDiff = genDiff(getFixturePath('before.yaml'), getFixturePath('after.yaml'));
  expect(testDiff).toMatch(readFile('stylishResult.txt'));
});

test('comparing json vs yaml in plain format', () => {
  const testDiff = genDiff(getFixturePath('before.json'), getFixturePath('after.yaml'), 'plain');
  expect(testDiff).toMatch(readFile('plainResult.txt'));
});

test('comparing json vs yaml in json format', () => {
  const testDiff = genDiff(getFixturePath('before.json'), getFixturePath('after.yaml'), 'json');
  expect(testDiff).toMatch(readFile('jsonResult.txt'));
});
