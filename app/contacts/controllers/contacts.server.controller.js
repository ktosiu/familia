var Contact = require('mongoose').model('contact');
var contactValidation = require('../lib/contacts.validation.js');

exports.contactById = function(req, res, next, contact_id){
	Contact.findOne({_id: contact_id}, function(err, contact){
		if(err || contact===null || contact===undefined)
            res.status(404).json({'msg':'Invalid Contact !'});
		else{
			req.contact_id = contact._id;
			next();
		}
	});
}

exports.listContactUI = function(req, res){
	Contact.find({})
	.populate({ path: 'related_to_contact', select: 'full_name _id'})
	.exec(function(err, contacts_list){
		if (err || contacts_list==null || contacts_list==undefined)
			res.status(401).json(err);
		else{
			res.render('contacts/views/list-contacts', {contacts_list: contacts_list})
		}
	});
}

exports.addContactUI = function(req, res){
	res.render('contacts/views/add-contact');
}

exports.createContactAPI = function(req, res){
	if (req.body.relation == 'none'){
		delete req.body.relation;
		delete req.body.related_to_contact;
	}
	if (req.body.anniversaries.length == 1 && req.body.anniversaries.day == null) {
		delete req.body.anniversaries;
	}
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

exports.viewContactUI = function(req, res){
	Contact.findOne({_id:req.contact_id}, function(err, contact){
			if (err || contact==null || contact==undefined)
				res.status(401).json(err);
			else{
				res.render('contacts/views/view-contact', {contact: contact})
			}
	});
}

exports.viewContactAPI = function(req, res){
	Contact.findOne({_id:req.contact_id}, function(err, contact){
			if (err || contact==null || contact==undefined)
				res.status(401).json(err);
			else{
				res.json(contact);
			}
	});
}

exports.home = function(req, res){
	res.send("Home");
}