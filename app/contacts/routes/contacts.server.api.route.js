var contactsController = require('../controllers/contacts.server.controller.js');
var domainRoot = '/api';

module.exports = function(app){
	app.route(domainRoot + '/contacts/list')
	.get(contactsController.fetchContactAPI); // home.ejs
	
	app.route(domainRoot + '/contacts')
	.post(contactsController.createContactAPI);

	app.route(domainRoot + '/contacts/:contact_id')
	.get(contactsController.viewContactAPI)
	.put(contactsController.updateContactAPI);

	app.param('contact_id', contactsController.contactById);
}