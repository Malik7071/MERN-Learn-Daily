const fs = require('fs');

// Write to a file
fs.writeFileSync('hello.txt', 'Hello, Node.js!');

// Read from the file
const data = fs.readFileSync('hello.txt', 'utf8');
console.log(data);

// Use a third-party module
const _ = require('lodash');
console.log(_.capitalize('hello lodash'));
