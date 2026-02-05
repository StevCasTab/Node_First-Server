// ==============================
// Import required Node.js modules
// ==============================

// Import the built-in HTTP module
// This allows us to create an HTTP server
const http = require('http');


//Import the routes.js file
const routes = require('./routes');

// ==========================================
// Create the server (runs on every request)
// ==========================================

// createServer takes a callback function that runs
// every time a request hits the server
const server = http.createServer(routes);
// const server = http.createServer(routes.handler);

// console.log(routes.someText);

// ==========================================
// Start listening for requests
// ==========================================

// Listen on port 3000 (commonly used for local development)
server.listen(3000);