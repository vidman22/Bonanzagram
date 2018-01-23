var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var WordSchema = new Schema ({
	word: {
		type: String,
		trim: true
	}
});

var Word = mongoose.model("Word", WordSchema);
module.exports = Word;