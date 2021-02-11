<h1 align="center">
  <br>
  Difference Generator
  <br>
</h1>

<h4 align="center">A CLI application that compares two configuration files and shows a difference.</a></h4>

  <p align="center">
  <a href="https://codeclimate.com/github/RoninSK8/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/193d59e0ffe77990b6a2/maintainability" /></a>
  <a href="https://codeclimate.com/github/RoninSK8/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/193d59e0ffe77990b6a2/test_coverage" /></a>
  <a href="https://github.com/RoninSK8/frontend-project-lvl1/workflows/Lint/badge.svg"><img src="https://github.com/RoninSK8/frontend-project-lvl1/workflows/Lint/badge.svg" /></a>
  <a href="https://github.com/RoninSK8/frontend-project-lvl2/actions"><img src="https://github.com/RoninSK8/frontend-project-lvl2/workflows/hexlet-check/badge.svg" /></a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#How to use">How to use</a> •
  <a href="#Demonstration">Demonstration</a> •
</p>

## Key Features

* Compare two configuration files
  - Instantly shows the difference in console.
* Supports `.json` and `.yaml` files
* Supports relative and absolute paths
* You can choose an output format:
  - stylish
```
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
}
```
  - plain
```
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
```
  - json
```
  [{"key":"common","status":"node","children":[{"key":"follow","value":false,"status":"added"},{"key":"setting1","value":"Value 1","status":"unchanged"},{"key":"setting2","value":200,"status":"deleted"},{"key":"setting3","oldValue":true,"newValue":null,"status":"updated"},{"key":"setting4","value":"blah blah","status":"added"},{"key":"setting5","value":{"key5":"value5"},"status":"added"},{"key":"setting6","status":"node","children":[{"key":"doge","status":"node","children":[{"key":"wow","oldValue":"","newValue":"so much","status":"updated"}]},{"key":"key","value":"value","status":"unchanged"},{"key":"ops","value":"vops","status":"added"}]}]}]
```

## Installation

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/RoninSK8/frontend-project-lvl2.git

# Go into the repository
$ cd frontend-project-lvl2

# Install
$ npm install
```

## How to use

```bash
$ gendiff <file1> <file2>
# Default output is in 'stylish' format
$ gendiff --f stylish <file1> <file2>

# Result in 'plain' format
$ gendiff --f plain <file1> <file2>

# Result in 'json' format
$ gendiff --f json <file1> <file2>

# To access help
$ gendiff --help
```
## Demonstration

[![asciicast](https://asciinema.org/a/390470.svg)](https://asciinema.org/a/390470)