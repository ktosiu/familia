var Contact = require('mongoose').model('contact');
var contactValidation = require('../lib/contacts.validation.js');
var moment = require('moment');
var gm = require('gm').subClass({imageMagick: true});
var fs = require('fs');

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
			res.render('contacts/views/list-contacts', {contacts_list: contacts_list, moment: moment});
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
	console.log("day",req.body.anniversaries[0].day)
	if (req.body.anniversaries[0].day == "" || req.body.anniversaries[0].day == null) {
		delete req.body.anniversaries;
	}
	var contact = new Contact(req.body);
	if(req.file){
		contact.avatar = contact._id + '-avatar.jpg';
	}
	contact.save(function(err, contact){
		if(err)
			res.json(err);
		else{
			if (req.file)
				gm(req.file.path)
			.resize(200, 200)
			.quality(90)
			.write('app/contacts/public/uploads/avatars/' + contact._id + '-avatar.jpg', function (err) {
				if (err)
					res.json(err);
				else{
					console.log('Done uploading !');
					fs.unlink(req.file.path);
					res.status(201).json({'msg' : 'Contact Added !'});
				}
			});
		}
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
			Contact.find({related_to_contact:contact._id}, function(err, related_contacts){
				if (err || related_contacts==null || related_contacts==undefined)
					res.status(401).json(err);
				else{
					res.render('contacts/views/view-contact', {contact: contact, related_contacts: related_contacts, moment:moment})
				}
			});
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

exports.editContactUI = function(req, res){
	Contact.findOne({_id:req.contact_id}, function(err, contact){
		if (err || contact==null || contact==undefined)
			res.status(401).json(err);
		else{
			res.render('contacts/views/edit-contact', {contact:contact, moment:moment});
		}
	});
}

exports.updateContactAPI = function(req, res) {
	console.log(req.body);
	if (req.body.relation == 'none'){
		delete req.body.relation;
		delete req.body.related_to_contact;
	}
	if (req.body.anniversaries.length == 1 && req.body.anniversaries[0].day == null) {
		delete req.body.anniversaries;
	}
	Contact.findOneAndUpdate({ _id: req.contact_id}, req.body, {safe:true, upsert:true}, function(err, doc){
		if (err) 
			res.status(500).json('');
		else
			res.status(201).json({'msg':'Contact Updated !'});
	});
}

exports.contactsDashboardUI = function(req, res){
	Contact.find({}, function(err, contacts_list){
		if (err || contacts_list==null || contacts_list==undefined)
			res.status(401).json(err);
		else{
			res.render('contacts/views/contacts-dashboard', {contacts_list:contacts_list});
		}
	});
}

exports.home = function(req, res){
	res.send("Home");
}