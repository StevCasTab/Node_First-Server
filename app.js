//import HTTP Library
const http = require('http');

//import file system library
const fs = require('fs');

//Create Server Logic that runs for each request
const server = http.createServer((req,res) => {
    //console.log(req.url, req.method, req.headers);
    
    const url = req.url;
    const method = req.method;

    if(url === '/')
    {
        //Write to Result
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></body>');
        res.write('</html>');
    }
    else if(url === "/message" && method === "POST")
    {
        //Create new file
        fs.writeFileSync('message.txt', 'DUMMY');

        //Pass header 302 (Redirection)
        res.statusCode = 302;

        //Set Header of result to redirect to new URL
        res.setHeader('Location', '/');

    }
    else{
        //Write to Result
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
        res.write('</html>');
    }
    //Mark end of result
    res.end();

    //Exit the process
    //process.exit();
});

//Listen on Port 3000 which is safe for localhost usage
server.listen(3000);






// /*function rqListener(req, res)
// {
//     console.log(req);
// }

// http.createServer(rqListener);*/


//========================================================
//OR
//========================================================
/*http.createServer(function(req, res) {

});*/

//========================================================



//========================================================
//OR
//========================================================

/*http.createServer((req,res) => {
    
});*/

//========================================================