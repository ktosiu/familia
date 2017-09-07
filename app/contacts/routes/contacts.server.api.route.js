var contactsController = require('../controllers/contacts.server.controller.js');
var domainRoot = '/api';

module.exports = function(app){
	app.route(domainRoot + '/contacts/list')
	.get(contactsController.fetchContactAPI); // home.ejs
	
	app.route(domainRoot + '/contacts')
	.post(contactsController.createContactAPI);

	app.param('contact_id', contactsController.contactById);
}