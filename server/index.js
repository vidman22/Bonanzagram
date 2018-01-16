/// Dependencies ///////////
const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const server = http.createServer(app)
const bodyParser = require('body-parser')
const socketIo= require('socket.io')
const io = module.exports.io = socketIo(server)
const SocketManager = require('./SocketManager')
const passport = require('passport')
const flash = require('connect-flash')
// const mongoose = require('mongoose')
const db = require('./models')
const PORT = 3001;

/////////////////////////////


app.use(bodyParser.urlencoded({extended: false}))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../build/')));

io.on('connection',SocketManager)

server.listen(PORT, () => {
	console.log("On port: " + PORT);
});

require('./passport.js')(passport);
require('./routes.js')(app, passport, db, path);





// mongoose.Promise = Promise;
// mongoose.connect("mongodb://localhost/bana_blitz", {
// 	useMongoClient: true
// });

// var morgan = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');

// app.use(morgan('combined'));
// app.use(cookieParser());
// app.use(flash());