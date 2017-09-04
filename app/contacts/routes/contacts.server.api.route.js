var contactsController = require('../controllers/contacts.server.controller.js');
var domainRoot = '/api';

module.exports = function(app){
	app.route(domainRoot + '/contacts')
	.get(contactsController.home) // home.ejs
	.post(contactsController.createContactAPI);

	app.param('contact_id', contactsController.contactById);
}