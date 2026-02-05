//import HTTP Library
const http = require('http');

//Create Server Logic that runs for each request
const server = http.createServer((req,res) => {
    console.log(req.url, req.method, req.headers);
    
    //Pass Meta Info that the type of return content will be HTML
    res.setHeader('Content-Type', 'text/html');

    //Write to Result
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');

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