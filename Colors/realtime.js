var express = require("express");
var path = require("path");
var app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

const server = app.listen(8888, function() {
    console.log("Listening on port 8888");
});
const io = require('socket.io')(server);

app.get('/', function(req, res) {
    res.render("colors");
});

var color;

io.on("connection", function (socket) {

    if (color == "lightblue") {
        socket.emit("background", "lightblue");
    }
    else if (color == "rgb(190, 240, 190)") {
        socket.emit("background", "rgb(190, 240, 190)");
    }
    else if (color == "lightpink") {
        socket.emit("background", "lightpink");
    }
    else {
        socket.emit("background", "white");
    }

    socket.on("color1", function () {
        color = "lightblue";
        io.emit("background", "lightblue");
    });
    socket.on("color2", function () {
        color = "rgb(190, 240, 190)";
        io.emit("background", "rgb(190, 240, 190)");
    });
    socket.on("color3", function () {
        color = "lightpink";
        io.emit("background", "lightpink");
    });
});