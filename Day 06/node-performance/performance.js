const http = require('http');
const { fork } = require('child_process');
const os = require('os');

// Performance monitoring
const start = Date.now();

http.createServer((req, res) => {
  if (req.url === '/compute') {
    // Forking to handle heavy computation
    const compute = fork('./compute.js');
    compute.send('start');
    compute.on('message', (result) => {
      res.end(`Computation result: ${result}`);
    });
  } else {
    res.end('Hello World');
  }
}).listen(3000, () => {
  console.log(`Server running on http://localhost:3000/`);
});

console.log(`Uptime: ${os.uptime()} seconds`);
console.log(`Startup Time: ${Date.now() - start}ms`);
