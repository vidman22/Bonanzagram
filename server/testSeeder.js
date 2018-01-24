const mongoose = require('mongoose');
const db = require('./models')
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/banana_spell", {
	useMongoClient: true
});

const LineByLine = require('line-by-line')
seedWords();

function seedWords() {
	console.log('starting seed');
	var allTheWords = [];
	var lr = new LineByLine('../WORD.LST');

	lr.on('line', function (line) {
		lr.pause();
		
		setTimeout( function() {
			allTheWords.push(line);	
			console.log(allTheWords.length);
			if(allTheWords.length === 40000) {
				console.log(allTheWords);
				closingFunction(allTheWords);
			} else {
				
				lr.resume();
			}
		}, .01);
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
