const fs = require('fs');
const { Transform } = require('stream');

// Create a readable stream
const readableStream = fs.createReadStream('input.txt', 'utf8');

// Create a writable stream
const writableStream = fs.createWriteStream('output.txt');

// Create a transform stream to convert data to uppercase
const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

// Pipe the streams together
readableStream
  .pipe(transformStream)
  .pipe(writableStream)
  .on('finish', () => {
    console.log('Processing complete, check output.txt');
  });
