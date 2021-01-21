#!/usr/bin/env node
import program from 'commander';
import genDiff from '../index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  
  .option('-f, --format', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action(genDiff(filepath1, filepath2))

program.parse(process.argv);