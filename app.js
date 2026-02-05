// ==============================
// Import required Node.js modules
// ==============================

// Import the built-in HTTP module
// This allows us to create an HTTP server
const http = require('http');

// Import the File System module
// This lets us read from and write to files
const fs = require('fs');


// ==========================================
// Create the server (runs on every request)
// ==========================================

// createServer takes a callback function that runs
// every time a request hits the server
const server = http.createServer((req, res) => {

    // req = request object (data sent FROM the client)
    // res = response object (data sent BACK to the client)

    // Get the requested URL (e.g. "/", "/message")
    const url = req.url;

    // Get the HTTP method (GET, POST, etc.)
    const method = req.method;


    // ==========================
    // Route: Home page (/)
    // ==========================
    if (url === '/') {

        // Write HTML content to the response
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');

        // Form sends a POST request to /message
        res.write(
            '<body>' +
            '<form action="/message" method="POST">' +
            '<input type="text" name="message">' +
            '<button type="submit">Submit</button>' +
            '</form>' +
            '</body>'
        );

        res.write('</html>');
    }


    // ======================================
    // Route: Handle form submission (/message)
    // ======================================
    else if (url === '/message' && method === 'POST') {

        // Create an array to store incoming data chunks
        const body = [];

        // HTTP request bodies arrive in pieces (streams)
        // This event fires every time a new chunk arrives
        req.on('data', (chunk) => {

            // chunk is a Buffer (raw binary data)
            console.log(chunk);

            // Store each chunk in the array
            body.push(chunk);
        });

        // This event fires once ALL data has been received
        req.on('end', () => {

            // Combine all chunks into one Buffer
            // Then convert it into a readable string
            const parsedBody = Buffer.concat(body).toString();

            // Example parsedBody:
            // "message=HelloWorld"
            // Split the string to get only the message value
            const message = parsedBody.split('=')[1];

            // Write the message to a file
            // This creates or overwrites message.txt
            //fs.writeFileSync('message.txt', message);

            // Save the message to a file, then redirect the user back to the home page
            fs.writeFile('message.txt', message, (err) => {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    return res.end('Failed to save message');
                }

                // Redirect the browser to "/"
                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end();
            });
        });

        // Tell the browser to redirect (HTTP 302)
        res.statusCode = 302;

        // Redirect the browser back to the home page
        res.setHeader('Location', '/');
    }


    // ==========================
    // Default route (fallback)
    // ==========================
    else {

        // Send a simple HTML response
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
        res.write('</html>');
    }


    // End the response
    // This tells the browser we are done sending data
    res.end();
});


// ==========================================
// Start listening for requests
// ==========================================

// Listen on port 3000 (commonly used for local development)
server.listen(3000);