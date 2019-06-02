var express = require("express");

var PORT = process.env.PORT || 8000;

var app = express();


// start our server so it can begin listening to client requests
app.listen(PORT, function() {
    // log (server-side) when our server has started
    console.log("server listening on: http://localhost:" + PORT);
});