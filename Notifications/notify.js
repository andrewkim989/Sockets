var express = require("express");
var path = require("path");
var app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

const server = app.listen(9500, function() {
    console.log("Listening on port 9500");
});
const io = require('socket.io')(server);

var messages = [];

app.get('/', function(req, res) {
    res.render("wall", {messages, messages});
});

io.on('connection', function (socket) {
    socket.emit("showAll", messages);

    var id = socket.id;
    socket.broadcast.emit("newUserIsHere", id);

    socket.on("notifyAll", function () {
        socket.broadcast.emit("sendNotification", id);
    });

    socket.on('disconnect', function () {
        var id = socket.id;
        socket.broadcast.emit("userDisconnected", id);
    });
});