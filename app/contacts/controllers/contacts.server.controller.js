var Contact = require('mongoose').model('contact');
var contactValidation = require('../lib/contact.validation.js');

exports.contactById = function(req, res){
	res.render('contacts/views/home');
}

exports.listContactUI = function(req, res){
	Contact.find({})
	.populate({ path: 'related_to_contact', select: 'full_name _id'})
	.exec(function(err, contact_list){
		if (err || contact_list==null || contact_list==undefined)
			res.status(401).json(err);
		else{
			res.render('contacts/views/list-contact', {contact_list: contact_list})
		}
	});
}

exports.addContactUI = function(req, res){
	res.render('contacts/views/add-contact');
}

exports.createContactAPI = function(req, res){
	var contact = new Contact(req.body);
	contact.save(function(err, contact){
		if(!err)
			res.status(201).json({'msg' : 'Contact Added !'});
		else
			res.json(err);
	});
}

exports.listContactAPI = function(req, res){
	Contact.find({})
	.populate({ path: 'related_to_contact', select: 'full_name _id'})
	.exec(function(err, contact_list){
		if (err || contact_list==null || contact_list==undefined)
			res.status(401).json(err);
		else{
			res.json(contact_list)
		}
	});
}

exports.fetchContactAPI = function(req, res){
	Contact.find({}, {_id: 1, full_name: 1}, function(err, contact_list){
		if (err || contact_list==null || contact_list==undefined)
			res.status(401).json(err);
		else{
			res.json({success:true, results: contact_list})		
		}
	});
}