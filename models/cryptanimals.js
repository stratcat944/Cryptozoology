var mongoose = require('mongoose');

var cryptAnimalSchema = mongoose.Schema({

	name 			: String,
	coloring 		: String,
	calories 		: {type : Number, default : 0},
	componentAnimal : [String]


});

var CryptAnimal = mongoose.model('CryptAnimal', cryptAnimalSchema);

module.exports = CryptAnimal;