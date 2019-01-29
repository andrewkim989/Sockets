var express = require("express");
var path = require("path");
var app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var count = 0;

const server = app.listen(7000, function() {
    console.log("Listening on port 7000");
});
const io = require('socket.io')(server);

app.get('/', function(req, res) {
    res.render("game");
});

io.on('connection', function (socket) {

    socket.on("countup", function () {
        count++;
        io.emit("plusone", count);
    });
    socket.on("reset", function () {
        count = 0;
        io.emit("zero", count);
    });
});