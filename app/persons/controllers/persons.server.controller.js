var Person = require('mongoose').model('person');
var personValidation = require('../lib/persons.validation.js');

exports.home = function(req, res){
	res.render('persons/views/home');
}

exports.personById = function(req, res){
	res.render('persons/views/home');
}

exports.listPersonsUI = function(req, res){
	Person.find({}, function(err, person_list){
		if (err || person_list==null || person_list==undefined)
			res.status(401).json(err);
		else{
			res.render('persons/views/list-people', {person_list: person_list})
		}
	});
}

exports.addPersonUI = function(req, res){
	res.render('persons/views/add_person');
}

exports.createPersonAPI = function(req, res){
	var person = new Person(req.body);
	person.save(function(err, person){
		if(!err)
			res.status(201).json({'msg' : 'Person Added !'});
		else
			res.json(err);
	});
}

exports.listPersonsAPI = function(req, res){
	Person.find({}, function(err, person_list){
		if (err || person_list==null || person_list==undefined)
			res.status(401).json(err);
		else{
			res.json(person_list)
		}
	});
}

exports.fetchPersonsAPI = function(req, res){
	Person.find({}, {_id: 1, full_name: 1}, function(err, person_list){
		if (err || person_list==null || person_list==undefined)
			res.status(401).json(err);
		else{
			res.json({success:true, results: person_list})		
		}
	});
}

exports.create = function(req, res){
	res.send('Module Created !');
}

exports.edit = function(req, res){
	res.render('persons/views/edit');
}

exports.update = function(req, res){
	res.render('Module Updated !');
}

exports.view = function(req, res){
	res.render('persons/views/view');
}

exports.delete = function(req, res){
	res.render('persons/views/delete');
}

exports.remove = function(req, res){
	res.send('Module Removed !');
}
