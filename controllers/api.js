var CryptAnimal = require('../models/cryptanimals');

var apiController = {

	get 	: function(req, res){
			// want to be able to get ALL animals or just one.

			// One animal

			var requestID = req.query._id;

			if (requestID){
				// One Animal
				CryptAnimal.findOne({_id : requestID}, function(err, animal){
					res.send(animal)
				})

			} else {

			CryptAnimal.find({}, function(err, animals){
				res.send(animals)
			});
		}
	},

	create 	: function(req, res){

		// console.log("!!!!!", req.query, req.body, req.params);
		req.body.componentAnimals = req.body.componentAnimals.split(', ');
		
		var animal = new CryptAnimal(req.body);
		animal.save(function(err, doc){
			res.send(doc);
		})
	},

	delete 	: function(req, res){

		CryptAnimal.remove({_id : req.params.id}, function(err, result){
			res.send(result);
		})

	}

}

module.exports = apiController;