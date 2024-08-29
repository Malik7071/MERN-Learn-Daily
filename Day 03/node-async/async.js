const fs = require('fs');
const util = require('util');

// Convert fs.readFile into a promise-based function
const readFile = util.promisify(fs.readFile);

// Using Callbacks
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('Callback Read:', data);
});

// Using Promises
readFile('example.txt', 'utf8')
  .then(data => {
    console.log('Promise Read:', data);
  })
  .catch(err => {
    console.error(err);
  });

// Using Async/Await
async function readFileAsync() {
  try {
    const data = await readFile('example.txt', 'utf8');
    console.log('Async/Await Read:', data);
  } catch (err) {
    console.error(err);
  }
}

readFileAsync();
