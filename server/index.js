/// Dependencies ///////////
const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const server = http.createServer(app)
const bodyParser = require('body-parser')
const socketIo= require('socket.io')
const io = module.exports.io = socketIo(server)
const SocketManager = require('./SocketManager');
const flash = require('connect-flash')
var passport = require('passport');
const mongoose = require('mongoose');
const db = require('./models')
const PORT = 3001;

const fs = require('fs')
/////////////////////////////


app.use(bodyParser.urlencoded({extended: false}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../build/')));

io.on('connection', SocketManager)

server.listen(PORT, () => {
	console.log("On port: " + PORT);
});

require('./passport.js')(passport);
require('./routes.js')(app, passport, db, path);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/banana_spell", {
	useMongoClient: true
});

// var morgan = require('morgan');
// var cookieParser = require('cookie-parser');

// app.use(morgan('combined'));
// app.use(cookieParser());

// app.use(flash());


function seedWords() {
	console.log('starting seed');
	var allTheWords = [];
	var lr = new LineByLine('../WORD.LST');

	lr.on('line', function (line) {
		lr.pause();
		
		setTimeout( function() {
			allTheWords.push(line);	
			console.log(allTheWords.length);
			if(allTheWords.length === 30000) {
				console.log(allTheWords);
				closingFunction(allTheWords);
			} else {
				
				lr.resume();
			}
		}, .1);
	});

	lr.on('error', function(err) {
		console.log(err);
	});

	lr.on('end', function() {
		console.log('done on emitted function');
	})
}

function closingFunction(arr) {

	console.log('end function')
	for(wrd of arr) {
		var newWord = new db.Word({word: wrd});
		newWord.save();
	}
	console.log('done done done');
}
