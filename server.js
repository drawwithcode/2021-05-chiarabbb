console.log("running the server!");
//  Load express
let express = require("express");
let app = express();
//  Defined port (for localhost)
//  Port created by heroku or Locally
const port = process.env.PORT || 8000;

//  Defined server and connection
let server = app.listen(port);
console.log("Server is running on https://localhost:" + port);

app.use(express.static("public"));

//  Import socket
let serverSocket = require("socket.io");
//  Assign the variable that runs the express
let io = se
