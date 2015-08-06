var cryptApp = angular.module('cryptApp', ['ngResource', 'ngRoute']);


cryptApp.config(function($routeProvider){

	$routeProvider
		.when('/',{
			templateUrl	: '/templates/cryptanimallist',
			controller 	: 'cryptAnimalList'
		})
		.when('/animals/:id', {
			templateUrl : '/templates/cryptanimal',
			controller : 'cryptAnimalPage'

		})


});

cryptApp.factory('animalFactory', function($resource){
	
	var model = $resource('/api/animals/:id', {id : '@_id'})

	// this._id
	// @_id

	// model.query()
	// model.get()
	// model.$save()
	// model.$delete()

	return {
		model 		: model,
		animals 	: model.query() // initiating a GET request to /api/animals
	}
});


cryptApp.controller('cryptAnimalList', function($scope, animalFactory){
	console.log('I AM THE CONTROLLER', animalFactory);

	$scope.sortAnimals + function(){
		console.log('sort order!', $scope.sortOrder)

		if ($scope.sortOrder === 'true'){
			$scope.sortOrder = true
		}
		else {
			$scope.sortOrder = false
		}
	}

	$scope.lowCal = function(animal){
		return animal.calories < 1000
	}
	$scope.bulkup = function(animal){
		return animal.calories > 1000
	}

	$scope.animals = animalFactory.animals;

	$scope.addAnimal = function(){
		var newCryptAnimal = new animalFactory.model(this.newAnimal);

		newCryptAnimal.$save(function(returnData){
			// console.log('return', returnData)
			animalFactory.animals.push(returnData)
		});

		this.newAnimal = {};
	}
});


cryptApp.controller('cryptAnimalPage', function($scope, animalFactory, $routeParams){

	console.log('Animal with this id : ', $routeParams.id)

	$scope.animal = animalFactory.model.get({_id : $routeParams.id})
});







