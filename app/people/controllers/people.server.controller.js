var People = require('mongoose').model('people');
var peopleValidation = require('../lib/people.validation.js');

exports.home = function(req, res){
	res.render('peoples/views/home');
}

exports.peopleById = function(req, res){
	res.render('peoples/views/home');
}

exports.listPeopleUI = function(req, res){
	People.find({})
	.populate({ path: 'related_to_people', select: 'full_name _id'})
	.exec(function(err, people_list){
		if (err || people_list==null || people_list==undefined)
			res.status(401).json(err);
		else{
			res.render('people/views/list-people', {people_list: people_list})
		}
	});
}

exports.addPeopleUI = function(req, res){
	res.render('peoples/views/add_people');
}

exports.createPeopleAPI = function(req, res){
	var people = new People(req.body);
	people.save(function(err, people){
		if(!err)
			res.status(201).json({'msg' : 'People Added !'});
		else
			res.json(err);
	});
}

exports.listPeopleAPI = function(req, res){
	People.find({})
	.populate({ path: 'related_to_people', select: 'full_name _id'})
	.exec(function(err, people_list){
		if (err || people_list==null || people_list==undefined)
			res.status(401).json(err);
		else{
			res.json(people_list)
		}
	});
}

exports.fetchPeopleAPI = function(req, res){
	People.find({}, {_id: 1, full_name: 1}, function(err, people_list){
		if (err || people_list==null || people_list==undefined)
			res.status(401).json(err);
		else{
			res.json({success:true, results: people_list})		
		}
	});
}

exports.create = function(req, res){
	res.send('Module Created !');
}

exports.edit = function(req, res){
	res.render('peoples/views/edit');
}

exports.update = function(req, res){
	res.render('Module Updated !');
}

exports.view = function(req, res){
	res.render('peoples/views/view');
}

exports.delete = function(req, res){
	res.render('peoples/views/delete');
}

exports.remove = function(req, res){
	res.send('Module Removed !');
}
