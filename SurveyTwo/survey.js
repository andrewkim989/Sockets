var express = require("express");
var path = require("path");
var app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

const server = app.listen(4000, function() {
    console.log("Listening on port 4000");
});
const io = require('socket.io')(server);

app.get('/', function(req, res) {
    res.render("index");
});

io.on('connection', function (socket) {
    socket.on("posting_form", function (info) {
        var number2 = Math.floor(Math.random() * 1000) + 1

        console.log(info);
        socket.emit("updated_message", {
            info: info
        });
        socket.emit("random_number", {
            number: number2
        });
    });
});