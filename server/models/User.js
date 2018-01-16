var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema ({
	username: {
		type: String, 
		trim: true,
		required: "User needs username"
	},
	password: {
		type: String,
		required: "User needs password"
	},
	ranking: {  
		type: Number
	},
	created: {
		type: Date,
		default: Date.now()
	}
});

// Generates Hash
UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

UserSchema.methods.validPassword = function(formPassword) {
	if(this.password != null) {
	  return bcrypt.compareSync(formPassword, this.password);
	} else {
		return false;
	}
}


var User = mongoose.model("User", UserSchema);
module.exports = User; 