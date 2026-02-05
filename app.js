//import HTTP Library
const http = require('http');

//Create Server Logic that runs for each request
const server = http.createServer((req,res) => {
    console.log(req.url, req.method, req.headers);

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