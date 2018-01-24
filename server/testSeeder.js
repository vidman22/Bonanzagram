const mongoose = require('mongoose');
var fs = require('fs');
const Word = require('./models/Word.js')
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/banana_spell", {
	useMongoClient: true
});

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
	})
	.catch(e => console.log(e));
});