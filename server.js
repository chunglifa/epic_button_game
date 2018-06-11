const express = require("express");
const app = express();

var path = require("path");

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./static")));

const server = app.listen(1337);
const io = require('socket.io')(server);

var counter = 0;
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


//SESSION:
var session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

//VIEWS: 
app.get('/', function(req, res) {
    if (count > 0){
        count = count;
    }
    else{
        var count = 0;
    }
 res.render("index");
})

//SOCKET
io.on('connection',function (socket) { //2
    socket.on('button_clicked',function(){
        count = counter++
        console.log(count)
        socket.emit('new_count', count);
    });
    socket.on('reset', function(){
        counter = 0;
        count = counter;
        socket.emit('new_count', count);
    });

});


   


// tell the express app to listen on port 8000
// app.listen(1337, function() {
//  console.log("listening on port 8000");
// });
