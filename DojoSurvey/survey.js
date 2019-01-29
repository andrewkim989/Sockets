var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secretform',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render("index");
});

app.post('/process', function(req, res) {
    var sess = req.session;

    sess.name = req.body["name"];
    sess.location = req.body["location"];
    sess.language = req.body["language"];
    sess.comment = req.body["comment"];

    res.redirect('/results');
});

app.get('/results', function(req, res) {
    var sess = req.session;

    var name = sess.name;
    var location = sess.location;
    var language = sess.language;
    var comment = sess.comment;

    res.render("results", {name: name, location: location, language: language, comment: comment});
});

app.listen(2000, function() {
    console.log("listening on port 2000");
});