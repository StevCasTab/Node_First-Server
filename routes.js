// Import the File System module
// This lets us read from and write to files
const fs = require('fs');

function requestHandler(req, res)
{
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


            // -----------------------------
            // OPTION 1: Synchronous version
            // -----------------------------

            // Write the message to a file *synchronously*
            // - BLOCKS the single Node.js thread
            // - Nothing else can run until the file write finishes
            // - Simple, but dangerous for servers
            //fs.writeFileSync('message.txt', message);

            // What happens here:
            // 1. Node.js stops everything
            // 2. Writes the file to disk
            // 3. Only after finishing does the code continue
            // 4. During this time, the server cannot handle other requests



            // --------------------------------
            // OPTION 2: Asynchronous version
            // --------------------------------

            // Write the message to a file *asynchronously*
            // - Uses Node.js non-blocking I/O
            // - The main thread stays free
            // - Callback runs AFTER the file write completes
            fs.writeFile('message.txt', message, (err) => {
                if (err) {
                    console.error(err);

                    // If something goes wrong, send a server error
                    res.statusCode = 500;
                    return res.end('Failed to save message');
                }

                // Redirect the browser to "/"
                // This only happens AFTER the file is written
                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end();
            });

            // What happens here:
            // 1. Node.js STARTS the file write
            // 2. Hands the work off to the system (libuv thread pool)
            // 3. Immediately continues handling other requests
            // 4. When the write finishes, the callback is placed on the event loop
            // 5. The callback runs and sends the redirect
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
}


// ===============================
// OPTION 1: Export a single thing
// ===============================

// Export the requestHandler function directly
// - When another file does `require('./thisFile')`
// - They receive the function itself
// - This is the MOST COMMON pattern when exporting one main thing
module.exports = requestHandler;



// ===============================
// OPTION 2: Export an object
// ===============================

// Export multiple values as an object
// - The importing file receives an object
// - Useful when you want to expose more than one thing
// - Accessed like: imported.handler or imported.someText
//
// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// };



// ===================================
// OPTION 3: Export items individually
// ===================================

// Add properties to module.exports one by one
// - Functionally the same as OPTION 2
// - Just written differently
//
// module.exports.handler = requestHandler;
// module.exports.someText = "some hard coded text";



// =======================================
// OPTION 4: Using the `exports` shortcut
// =======================================

// `exports` is just a SHORTCUT (reference) to module.exports
// - This works ONLY if you are adding properties
// - You should NOT reassign `exports` directly
//
// These two lines do the same thing as OPTION 3:
//
// exports.handler = requestHandler;
// exports.someText = "some hard coded text";