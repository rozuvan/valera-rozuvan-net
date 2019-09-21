const path = require('path');

let ORIGINAL_STRING = null;
let NEW_STRING = null;

process.argv.forEach(function (val, index, array) {
  if (index === 2) {
    ORIGINAL_STRING = val;
  } else if (index === 3) {
    NEW_STRING = val;
  }
});

if (ORIGINAL_STRING === null || NEW_STRING === null) {
  console.log('ERROR: Please provide args!');
  return;
}

const currentPath = process.cwd();
const buildPath = path.join(currentPath, 'build');

const replace = require('replace-in-file');
const options = {
  files: `${buildPath}/**`,
  from: new RegExp(`\{\{${ORIGINAL_STRING}\}\}`, 'g'),
  to: NEW_STRING
};

try {
  replace.sync(options);
} catch (error) {
  console.error('Error occurred: ', error);
}
