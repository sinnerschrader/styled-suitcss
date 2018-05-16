#!/usr/bin/env node
'use strict';
const meow = require('meow');
const extractAll = require('./extract-all');

const cli = meow(`
	Usage
	  $ extract-styled-suitcss <input>

	Examples
	  $ extract-styled-suitcss "patterns/**/*.js"
	  $ extract-styled-suitcss "patterns/**/*.js" --outDir dist
`, {
  flags: {
    outDir: {
      type: 'string',
      alias: 'o'
    }
  }
});

const {input, flags} = cli

extractAll(input[0], flags);
