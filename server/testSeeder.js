const mongoose = require('mongoose');
mongoose.Promise = Promise;
const fs = require('fs');
const Word = require('./models/Word.js')

var uri = "mongodb://localhost/banana_spell";
// var uri = 'mongodb://JonP:phrase@ds213338.mlab.com:13338/heroku_7gln3b0z';

mongoose.connect(uri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
	seed();
});

function seed() {
	fs.readFile('../WORD.LST', 'utf8', function(err,data) {
	if(err) console.log(err);
	var array = data.split("\n");

	var mapped = array.map(word => ({word}))
	console.log(mapped);
	console.log('doing seed thing now');
	Word.create(mapped, function(err) {
		if (err) {
			console.log(err);
			return 
		} else {
			console.log('no error');
		}
	})
	.then(() => {
		console.log('done');
		console.log('done done')
	})
	.catch(e => console.log(e));
	});
}